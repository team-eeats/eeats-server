import { Injectable } from '@nestjs/common';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import { User } from '../../../../application/domain/user/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserPersistenceAdapter implements UserPort {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        private readonly userMapper: UserMapper
    ) {}

    async saveUser(user: User): Promise<User> {
        return this.userMapper.toDomain(
            await this.userRepository.save(this.userMapper.toEntity(user))
        );
    }

    async queryUserByAccountId(accountId: string): Promise<User | null> {
        return this.userMapper.toDomain(
            await this.userRepository.findOneBy({ accountId: accountId })
        );
    }

    async queryUsersWithAllergies(): Promise<User[]> {
        const usersWithAllergies = await this.userRepository
            .createQueryBuilder('user')
            .innerJoinAndSelect('user.allergies', 'allergy')
            .where('allergy.type IS NOT NULL')
            .getMany();

        return usersWithAllergies.map((UserTypeormEntity) =>
            this.userMapper.toDomain(UserTypeormEntity)
        );
    }
}
