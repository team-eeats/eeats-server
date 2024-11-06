import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { DeviceTokenPort } from '../../../application/domain/notification/spi/device-token.spi';
import { AllergyPort } from '../../../application/domain/allergy/spi/allergy.spi';
import { AllergyType } from '../../../application/domain/allergy/allergy.type';
import { Allergy } from '../../../application/domain/allergy/allergy';
import { AllergyMealEvent } from '../../../application/domain/allergy/event/allergy.meal.event';

@Injectable()
export class AllergyMealEventHandler {
    constructor(
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort,
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort,
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort,
        @Inject(AllergyPort)
        private readonly allergyPort: AllergyPort
    ) {}

    @OnEvent('MealCheckedEvent')
    async onMealChecked(event: AllergyMealEvent) {
        const { userId, mealDate, mealItems } = event;

        const userAllergies = await this.allergyPort.queryAllergiesByUserId(userId);
        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(userId);

        for (const mealItem of mealItems) {
            const allergyIntersection = this.getAllergyIntersection(mealItem.allergies, userAllergies);

            if (allergyIntersection.length > 0) {
                const notification: Notification = {
                    userId: userId,
                    topic: Topic.ALLERGY,
                    linkIdentifier: mealDate.toString(),
                    title: '알러지 주의 안내',
                    content: `오늘 급식 ${mealItem.name}에 ${this.getAllergyNames(allergyIntersection)}가 포함되어 있습니다.`,
                    createdAt: LocalDate.now(),
                    isRead: false,
                    id: undefined
                };

                await this.notificationPort.saveNotification(notification);
                await this.fcmPort.sendMessageToDevice(deviceToken.token, notification);
            }
        }
    }

    private getAllergyIntersection(mealAllergies: AllergyType[], userAllergies: Allergy[]): AllergyType[] {
        return mealAllergies.filter(allergyType =>
            userAllergies.some(userAllergy => userAllergy.type === allergyType)
        );
    }

    private getAllergyNames(allergyTypes: AllergyType[]): string {
        return allergyTypes.map(type => AllergyType[type]).join(', ');
    }
}
