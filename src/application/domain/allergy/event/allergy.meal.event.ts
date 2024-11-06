import { MealItem } from 'src/application/domain/meal/meal-item';

export class AllergyMealEvent {
    constructor(
        public readonly userId: string,
        public readonly mealDate: string,
        public readonly mealItems: MealItem[]
    ) {}
}
