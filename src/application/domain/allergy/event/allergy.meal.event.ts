export class AllergyMealEvent {
    constructor(
        public readonly mealInfo: any,
        public readonly usersWithAllergies: any[],
        public readonly date: string
    ) {}
}
