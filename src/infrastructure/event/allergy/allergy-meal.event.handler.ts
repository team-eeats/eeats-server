import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification, Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { AllergyType } from '../../../application/domain/allergy/allergy.type';
import { AllergyMealEvent } from '../../../application/domain/allergy/event/allergy.meal.event';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { AxiosPort } from 'src/application/common/spi/axios.spi';

@Injectable()
export class AllergyMealEventHandler {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort,
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort,
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort
    ) {}

    @OnEvent('AllergyMealEvent')
    async onAllergyMeal(event: AllergyMealEvent) {
        const mealInfo = await this.axiosPort.getMealInfo(event.date);
        const allergyTypeInMeal = this.getAllergyFromMeal(mealInfo);
        const usersWithAllergies = await this.userPort.queryUsersWithAllergies();

        for (const user of usersWithAllergies) {
            const matchedAllergies = user.allergies.filter((userAllergy) =>
                allergyTypeInMeal.includes(userAllergy.type)
            );

            if (matchedAllergies.length > 0) {
                const notification: Notification = {
                    id: undefined,
                    userId: user.id,
                    topic: Topic.ALLERGY,
                    linkIdentifier: event.date,
                    title: '알레르기 조심하세요!',
                    content: `오늘 급식에 ${matchedAllergies
                        .map((a) => AllergyType[a.type])
                        .join(', ')} 성분이 포함되어 있습니다.`,
                    createdAt: LocalDate.now(),
                    isRead: false
                };

                await this.notificationPort.saveNotification(notification);
                await this.fcmPort.sendMessageToDevice(notification.userId, notification);
            }
        }
    }

    private getAllergyFromMeal(mealInfo: any): AllergyType[] {
        const allergyTypesInMeal: AllergyType[] = [];

        ['breakfast', 'lunch', 'dinner'].forEach((mealTime) => {
            if (mealInfo[mealTime]) {
                mealInfo[mealTime].forEach((mealItem: string) => {
                    Object.values(AllergyType).forEach((type) => {
                        if (mealItem.includes(AllergyType[type])) {
                            allergyTypesInMeal.push(type as AllergyType);
                        }
                    });
                });
            }
        });

        return allergyTypesInMeal;
    }
}
