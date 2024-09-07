import { Injectable, Inject } from '@nestjs/common';
import { AllergyPort } from '../spi/allergy.spi';
import { Allergy } from '../allergy';
import { AllergyType } from '../allergy.type';

@Injectable()
export class ToggleAllergyUseCase {
    constructor(
        @Inject(AllergyPort)
        private readonly allergyPort: AllergyPort
    ) {}

    async execute(userId: string, types: AllergyType[]): Promise<void> {
        const allergies = await this.allergyPort.queryAllergiesByUserId(userId);

        for (const type of types) {
            const allergyExists = allergies.some(allergy => allergy.type === type);

            if (allergyExists) {
                await this.allergyPort.removeAllergy(userId, type);
            } else {
                await this.allergyPort.saveAllergy(new Allergy(userId, type));
            }
        }
    }
}
