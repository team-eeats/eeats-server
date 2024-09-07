import { Allergy } from '../allergy';
import { AllergyType } from '../allergy.type';

export interface AllergyPort {
    saveAllergy(allergy: Allergy): Promise<void>;

    queryAllergiesByUserId(userId: string): Promise<Allergy[]>;

    removeAllergy(userId: string, type: AllergyType): Promise<void>;
}

export const AllergyPort = Symbol('IAllergyPort');
