import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllergyTypeormEntity } from '../../domain/allergy/persistence/allergy.entity';
import { AllergyPort } from '../../../application/domain/allergy/spi/allergy.spi';
import { AllergyPersistenceAdapter } from '../../domain/allergy/persistence/allergy.persistence.adapter';
import { AllergyMapper } from '../../domain/allergy/persistence/allergy.mapper';
import { GetAllergyWarningsUseCase } from '../../../application/domain/allergy/usecase/get-allergy-warning.usecase';
import { AllergyWebAdapter } from '../../domain/allergy/presentation/allergy.web.adapter';
import { QueryAllergyUseCase } from '../../../application/domain/allergy/usecase/query-allergy.usecase';
import { ToggleAllergyUseCase } from '../../../application/domain/allergy/usecase/toggle-allergy.usecase';

const ALLERGY_REPOSITORY = TypeOrmModule.forFeature([AllergyTypeormEntity]);
const ALLERGY_PORT = { provide: AllergyPort, useClass: AllergyPersistenceAdapter };

@Global()
@Module({
    imports: [ALLERGY_REPOSITORY],
    providers: [
        ALLERGY_PORT,
        AllergyMapper,
        GetAllergyWarningsUseCase,
        QueryAllergyUseCase,
        ToggleAllergyUseCase
    ],
    exports: [ALLERGY_REPOSITORY, ALLERGY_PORT, AllergyMapper],
    controllers: [AllergyWebAdapter]
})
export class AllergyModule {}
