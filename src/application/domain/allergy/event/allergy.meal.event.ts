import { LocalDate } from 'js-joda';
import { MealItem } from 'src/application/domain/meal/meal-item';

export class AllergyMealEvent {
    constructor(
        public readonly userId: string,
        public readonly mealDate: LocalDate,
        public readonly mealItems: MealItem[]
    ) {}
}
