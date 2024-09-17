import { Global, Module } from '@nestjs/common';
import { AxiosPort } from '../../../application/common/spi/axios.spi';
import { AxiosAdapter } from '../../thirdparty/axios/axios.adapter';
import { GetMealUseCase } from '../../../application/domain/meal/usecase/get-meal.usecase';
import { MealWebAdapter } from 'src/infrastructure/domain/meal/presentation/meal.web.adapter';

const MEAL_PORT = { provide: AxiosPort, useClass: AxiosAdapter };

@Global()
@Module({
    providers: [GetMealUseCase, MEAL_PORT],
    exports: [MEAL_PORT],
    controllers: [MealWebAdapter]
})
export class AxiosModule {}
