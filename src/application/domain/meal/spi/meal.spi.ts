export interface MealPort {
    getMealInfo(schoolCode: string, date: string): Promise<any>;
}
