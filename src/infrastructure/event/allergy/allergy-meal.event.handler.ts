import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { MealPort } from '../../../application/domain/meal/spi/meal.spi';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { AllergyType } from '../../../application/domain/allergy/allergy.type';
import { AllergyMealEvent } from '../../../application/domain/allergy/event/allergy.meal.event';
import { UserPort } from '../../../application/domain/user/spi/user.spi';

@Injectable()
export class AlleryMealEventHandler {
    constructor(
        private readonly mealPort: MealPort,
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort,
        @Inject(UserPort)
        private readonly userPort: UserPort
    ) {}

    @OnEvent('AllergyMealEvent')
    async onAllergyMeal(event: AllergyMealEvent) {
        const mealInfo = await this.mealPort.getMealInfo(event.date);
        const allergyTypesInMeal = this.getAllergyFromMeal(mealInfo);
        const usersWithAllergies = await this.userPort.queryUsersWithAllergies();

        for (const user of usersWithAllergies) {
            const matchingAllergies = user.allergies.filter((userAllergy) => 
            allergyTypesInMeal.includes(userAllergy.type)
            );

            if (matchingAllergies.length > 0) {
                const notification: Notification = {
                    id: null,
                    userId: user.id,
                    topic: Topic.ALLERGY,
                    linkIdentifier: event.date,
                    title: '알레르기 조심 ㅎㅎ',
                    content: `오늘 급식에 ${matchingAllergies.map(a => AllergyType[a.type]).join(', ')} 성분이 포함되어 있습니다.`,
                    createdAt: LocalDate.now(),
                    isRead: false
                };

                await this.fcmPort.sendMessageToDevice(notification.userId, notification);
            }
        }
    }

    private getAllergyFromMeal(mealInfo: any): AllergyType[] {
        const allergyTypesInMeal: AllergyType[] = [];

        mealInfo.lunch.forEach((mealItem: string) => {
            Object.values(AllergyType).forEach((type) => {
                if (mealItem.includes(AllergyType[type])) {
                    allergyTypesInMeal.push(type as AllergyType);
                }
            });
        });

        return allergyTypesInMeal;
    }
}
