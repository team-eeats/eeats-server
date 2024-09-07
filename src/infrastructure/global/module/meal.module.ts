import { Module } from '@nestjs/common';
import { GetMealUseCase } from '../../../application/domain/meal/usecase/get-meal.usecase';
import { MealWebAdapter } from '../../domain/meal/presentation/meal.web.adapter';

@Module({
    providers: [GetMealUseCase],
    controllers: [MealWebAdapter],
})
export class MealModule {}
