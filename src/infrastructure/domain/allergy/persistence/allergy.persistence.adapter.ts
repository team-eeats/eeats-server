import { Injectable } from '@nestjs/common';
import { AllergyPort } from '../../../../application/domain/allergy/spi/allergy.spi';
import { Allergy } from '../../../../application/domain/allergy/allergy';
import { AllergyTypeormEntity } from './allergy.entity';
import { AllergyMapper } from './allergy.mapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergyType } from '../../../../application/domain/allergy/allergy.type';

@Injectable()
export class AllergyPersistenceAdapter implements AllergyPort {
    constructor(
        @InjectRepository(AllergyTypeormEntity)
        private readonly allergyRepository: Repository<AllergyTypeormEntity>,
        private readonly allergyMapper: AllergyMapper
    ) {}

    async saveAllergy(allergy: Allergy): Promise<void> {
        const entity = await this.allergyMapper.toEntity(allergy);
        
        this.allergyMapper.toDomain(await this.allergyRepository.save(entity));
    }

    async queryAllergiesByUserId(userId: string): Promise<Allergy[]> {
        const allergies = await this.allergyRepository.find({
            where: {
                user: { id: userId }
            },
            relations: {
                user: true
            }
        });

        return Promise.all(
            allergies.map(async (allergy) => await this.allergyMapper.toDomain(allergy))
        );
    }

    async removeAllergy(userId: string, type: AllergyType): Promise<void> {
        const allergy = await this.allergyRepository.findOne({
            where: { user: { id: userId }, type: type }
        });

        if (allergy) {
            await this.allergyRepository.remove(allergy);
        }
    }
}
