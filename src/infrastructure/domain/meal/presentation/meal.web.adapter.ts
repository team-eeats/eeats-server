import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetMealUseCase } from '../../../../application/domain/meal/usecase/get-meal.usecase';

@Controller('meals')
export class MealWebAdapter {
    constructor(private readonly getMealUseCase: GetMealUseCase) {}

    @Get()
    async getMeal(@Query('date') date: string): Promise<any> {
        return await this.getMealUseCase.execute(date);
    }
}
