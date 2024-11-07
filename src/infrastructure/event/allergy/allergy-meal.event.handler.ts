import { MealItem } from '../../../application/domain/meal/meal-item';
import { Allergy } from '../../../application/domain/allergy/allergy';
import { LocalDate, LocalDateTime } from 'js-joda';
import { Notification, Topic } from '../../../application/domain/notification/model/notification';
import { AllergyMealEvent } from '../../../application/domain/allergy/event/allergy.meal.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { DeviceTokenPort } from '../../../application/domain/notification/spi/device-token.spi';
import { AllergyPort } from '../../../application/domain/allergy/spi/allergy.spi';

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

    @OnEvent('AllergyMealEvent')
    async onMealChecked(event: AllergyMealEvent) {
        const { userId, mealDate, mealItems } = event;
        const userAllergies = await this.allergyPort.queryAllergiesByUserId(userId);
        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(userId);
        const allergyWarnings = this.checkAllergies(mealItems, userAllergies);

        if (allergyWarnings.length > 0) {
            const notification: Notification = {
                userId: userId,
                topic: Topic.ALLERGY,
                linkIdentifier: mealDate.toString(),
                title: '알러지 조심',
                content: `오늘 급식에 ${allergyWarnings.join(', ')}이 포함되어 있습니다.`,
                createdAt: LocalDateTime.now(),
                isRead: false,
                id: undefined
        };

            await this.notificationPort.saveNotification(notification);

            await this.fcmPort.sendMessageToDevice(deviceToken.token, notification);
        }
    }

    private checkAllergies(mealItems: MealItem[], userAllergies: Allergy[]): string[] {
        return mealItems
            .filter((item) =>
                item.allergies.some((allergy) =>
                    userAllergies.some((userAllergy) => userAllergy.type === allergy)
                )
            )
            .map((item) => item.name);
    }
}
