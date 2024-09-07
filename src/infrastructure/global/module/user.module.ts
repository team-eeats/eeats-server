import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../domain/user/persistence/user.entity';
import { UserPort } from '../../../application/domain/user/spi/user.spi';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence.adapter';
import { UserMapper } from '../../domain/user/persistence/user.mapper';
import { UserWebAdapter } from '../../domain/user/presentation/user.web.adapter';
import { UpdateProfileUseCase } from '../../../application/domain/user/usecase/update-profile.usecase';
import { QueryAllergyUseCase } from '../../../application/domain/allergy/usecase/query-allergy.usecase';
import { ToggleAllergyUseCase } from '../../../application/domain/allergy/usecase/toggle-allergy.usecase';
import { AllergyMapper } from '../../domain/allergy/persistence/allergy.mapper';
import { AllergyPort } from '../../../application/domain/allergy/spi/allergy.spi';
import { AllergyPersistenceAdapter } from '../../domain/allergy/persistence/allergy.persistence.adapter';
import { AllergyTypeormEntity } from '../../domain/allergy/persistence/allergy.entity';

const USER_PORT = { provide: UserPort, useClass: UserPersistenceAdapter };
const USER_REPOSITORY = TypeOrmModule.forFeature([UserTypeormEntity]);
const ALLERGY_PORT = { provide: AllergyPort, useClass: AllergyPersistenceAdapter };
const ALLERGY_REPOSITORY = TypeOrmModule.forFeature([AllergyTypeormEntity]);

@Global()
@Module({
    imports: [USER_REPOSITORY, ALLERGY_REPOSITORY],
    controllers: [UserWebAdapter],
    providers: [
        USER_PORT,
        UserMapper,
        UpdateProfileUseCase,
        ALLERGY_PORT,
        AllergyMapper,
        QueryAllergyUseCase,
        ToggleAllergyUseCase
    ],
    exports: [
        USER_PORT,
        USER_REPOSITORY,
        UserMapper,
        ALLERGY_PORT,
        ALLERGY_REPOSITORY,
        AllergyMapper
    ]
})
export class UserModule {}
