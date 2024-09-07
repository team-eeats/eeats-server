import { AllergyType } from './allergy.type';

export class Allergy {
    id: string;
    userId: string;
    type: AllergyType;

    constructor(userId: string, type: AllergyType, id?: string) {
        this.id = id;
        this.userId = userId;
        this.type = type;
    }
}
