import { Injectable, Inject } from '@nestjs/common';
import { PublishEventPort } from '../../../common/spi/event.spi';
import { UserPort } from '../../user/spi/user.spi';
import { AllergyType } from '../../allergy/allergy.type';
import { AllergyMealEvent } from '../../allergy/event/allergy.meal.event';
import { MealItem } from '../../meal/meal-item';
import { AxiosPort } from '../../../common/spi/axios.spi';

@Injectable()
export class GetMealUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort,
        @Inject(PublishEventPort)
        private readonly publishEventPort: PublishEventPort,
        @Inject(UserPort)
        private readonly userPort: UserPort
    ) {}

    async execute(date: string): Promise<any> {
        const mealInfo = await this.axiosPort.getMealInfo(date);
        const usersWithAllergies = await this.userPort.queryUsersWithAllergies();

        const mealItems = this.parseMealInfo(mealInfo);

        for (const user of usersWithAllergies) {
            await this.publishEventPort.publishEvent(
                new AllergyMealEvent(user.id, date, mealItems)
            );
        }

        return mealInfo;
    }
    private parseMealInfo(mealInfo: any): MealItem[] {
        const mealItems: MealItem[] = [];

        for (const [mealType, meals] of Object.entries(mealInfo)) {
            if (Array.isArray(meals) && meals.length > 1) {
                const [menu, calInfo] = meals;
                const menuItems = menu.split(', ');

                menuItems.forEach(item => {
                    mealItems.push({
                        name: item,
                        mealType: mealType,
                        allergies: this.extractAllergies(item),
                        calInfo: calInfo
                    });
                });
            }
        }

        return mealItems;
    }

    private extractAllergies(menuItem: string): AllergyType[] {
        const allergyRegex = /\((\d+)\)/g;
        const matches = [...menuItem.matchAll(allergyRegex)];
        return matches.map(match => parseInt(match[1]) as AllergyType);
    }
}
