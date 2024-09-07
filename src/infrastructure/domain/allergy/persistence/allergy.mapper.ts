import { Allergy } from '../../../../application/domain/allergy/allergy';
import { AllergyTypeormEntity } from './allergy.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Injectable()
export class AllergyMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: AllergyTypeormEntity): Promise<Allergy> {
        return entity ? new Allergy(entity.user.id, entity.type, entity.id) : null;
    }

    async toEntity(domain: Allergy): Promise<AllergyTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        return new AllergyTypeormEntity(user, domain.type, domain.id);
    }
}
