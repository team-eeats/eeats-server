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

    async execute(userId: string, type: AllergyType): Promise<void> {
        const allergies = await this.allergyPort.queryAllergiesByUserId(userId);

        const allergyExists = allergies.some(allergy => allergy.type === type);

        if (allergyExists) {
            await this.allergyPort.removeAllergy(userId, type);
        } else {
            await this.allergyPort.saveAllergy(new Allergy(userId, type));
        }
    }
}
