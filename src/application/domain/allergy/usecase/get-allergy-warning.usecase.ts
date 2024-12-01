import { Inject, Injectable } from '@nestjs/common';
import { AllergyPort } from '../spi/allergy.spi';
import { Allergy } from '../allergy';
import { MealItem } from '../../meal/meal-item';
import { AxiosPort } from '../../../common/spi/axios.spi';

@Injectable()
export class GetAllergyWarningsUseCase {
    constructor(
        @Inject(AllergyPort)
        private readonly allergyPort: AllergyPort,
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort
    ) {}

    async execute(userId: string, date: string): Promise<string> {
        const allergies = await this.allergyPort.queryAllergiesByUserId(userId);
        const mealItems = await this.axiosPort.getMealInfo(date);

        const allergyWarnings = this.checkAllergies(mealItems, allergies);

        return this.formatAllergyWarning(allergyWarnings);
    }

    private checkAllergies(
        mealItems: MealItem[],
        allergies: Allergy[]
    ): Array<{ name: string; allergies: number[] }> {
        return mealItems
            .map((item) => {
                const matchedAllergies = item.allergies
                    .filter((allergy: number) =>
                        allergies.some((userAllergy) => userAllergy.type === allergy)
                    );
                return matchedAllergies.length > 0
                    ? { name: item.name, allergies: matchedAllergies }
                    : null;
            })
            .filter((item): item is { name: string; allergies: number[] } => item !== null);
    }

    private formatAllergyWarning(
        allergyWarnings: Array<{ name: string; allergies: number[] }>
    ): string {
        if (allergyWarnings.length === 0) {
            return '알러지 성분이 포함된 메뉴가 없습니다.';
        }

        const menuList = allergyWarnings.map((item) => item.name).join(', ');
        const allergyList = [...new Set(allergyWarnings.flatMap((item) => item.allergies.map(String)))].join(', ');

        return `${menuList}에 ${allergyList} 알레르기 성분이 있어요!`;
    }
}
