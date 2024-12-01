import { Inject, Injectable } from '@nestjs/common';
import { AllergyPort } from '../spi/allergy.spi';
import { Allergy } from '../allergy';
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
        const mealInfo = await this.axiosPort.getMealInfo(date);

        const allergyWarnings = this.checkAllergies(mealInfo, allergies);
        return this.formatAllergyWarning(allergyWarnings);
    }

    private checkAllergies(
        mealInfo: any,
        allergies: Allergy[]
    ): Array<{ name: string; allergies: number[] }> {
        const allMeals = [...mealInfo.breakfast, ...mealInfo.lunch, ...mealInfo.dinner];

        return allMeals
            .filter(meal => meal !== '급식이 없습니다.')
            .map(meal => {
                const [name, ...details] = meal.split(',');
                const allergyNumbers = details.join(',').match(/\d+/g) || [];
                const matchedAllergies = allergyNumbers
                    .map(Number)
                    .filter(allergyNum =>
                        allergies.some(userAllergy => userAllergy.type === allergyNum)
                    );

                return matchedAllergies.length > 0
                    ? { name: name.trim(), allergies: matchedAllergies }
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

        const menuList = allergyWarnings.map(item => item.name).join(', ');
        const allergyList = [...new Set(allergyWarnings.flatMap(item => item.allergies))].join(', ');

        return `${menuList}에 ${allergyList} 알레르기 성분이 있어요!`;
    }
}
