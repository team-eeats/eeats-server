import { Injectable, Inject } from '@nestjs/common';
import { AllergyPort } from '../spi/allergy.spi';
import { Allergy } from '../allergy';

@Injectable()
export class QueryAllergyUseCase {
    constructor(
        @Inject(AllergyPort)
        private readonly allergyPort: AllergyPort
    ) {}

    async execute(userId: string): Promise<Allergy[]> {
        return await this.allergyPort.queryAllergiesByUserId(userId);
    }
}
