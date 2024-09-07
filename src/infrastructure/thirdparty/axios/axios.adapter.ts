import { Injectable } from '@nestjs/common';
import { MealPort } from '../../../application/domain/meal/spi/meal.spi';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AxiosAdapter implements MealPort {
    constructor(private readonly configService: ConfigService) {}

    async getMealInfo(schoolCode: string, date: string): Promise<any> {
        const NEIS_API_BASE_URL = 'https://open.neis.go.kr/hub/mealServiceDietInfo';

        const params = {
            ATPT_OFCDC_SC_CODE: this.configService.get<string>('NEIS_ATPT_CODE'),
            SD_SCHUL_CODE: schoolCode,
            MLSV_YMD: date,
            KEY: this.configService.get<string>('NEIS_API_KEY'),
            Type: 'json'
        };

        const response = await axios.get(NEIS_API_BASE_URL, { params });
        return response.data.mealServiceDietInfo[1].row;
    }
}
