import { Injectable } from '@nestjs/common';
import { MealPort } from '../../../application/domain/meal/spi/meal.spi';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosAdapter implements MealPort {
    constructor(private readonly configService: ConfigService) {}
    
    async getMealInfo(date: string): Promise<any> {
        const NEIS_API_BASE_URL = 'https://open.neis.go.kr/hub/mealServiceDietInfo';

        const params = {
            ATPT_OFCDC_SC_CODE: this.configService.get<string>('NEIS_ATPT_CODE'),
            SD_SCHUL_CODE: this.configService.get<string>('SCHOOL_CODE'),
            MLSV_YMD: date,
            KEY: this.configService.get<string>('NEIS_API_KEY'),
            Type: 'json'
        };

        const response = await axios.get(NEIS_API_BASE_URL, { params });
        const mealData = response.data.mealServiceDietInfo[1].row;

        const meals = this.parseMealData(mealData);

        return meals;
    }

    private parseMealData(mealData: any[]): any {
        const parsedMeals: { [key: string]: string[] } = {
            breakfast: [],
            lunch: [],
            dinner: []
        };

        mealData.forEach(meal => {
            const mealType = this.getMealType(meal.MMEAL_SC_CODE);

            parsedMeals[mealType].push(
                meal.DDISH_NM.replace(/<br\/>/g, ', ').replace(/\n/g, ', '),
                meal.CAL_INFO
            );
        });

        Object.keys(parsedMeals).forEach(mealType => {
            if (parsedMeals[mealType].length === 0) {
                parsedMeals[mealType].push('급식이 없습니다.');
            }
        });

        return parsedMeals;
    }

    private getMealType(mealCode: string): string {
        switch (mealCode) {
            case '1':
                return 'breakfast';
            case '2':
                return 'lunch';
            case '3':
                return 'dinner';
            default:
                return 'unknown';
        }
    }
}
