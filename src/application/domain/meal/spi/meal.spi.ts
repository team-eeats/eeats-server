export interface MealPort {
    getMealInfo(date: string): Promise<any>;
}
