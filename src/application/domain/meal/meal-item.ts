import { AllergyType } from 'src/application/domain/allergy/allergy.type';

export interface MealItem {
    name: string;
    mealType: string;
    allergies: AllergyType[];
    calInfo?: string;
}
