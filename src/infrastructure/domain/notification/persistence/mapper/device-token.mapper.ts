import { Injectable } from '@nestjs/common';
import { DeviceToken } from '../../../../../application/domain/notification/model/device-token';
import { DeviceTokenTypeormEntity } from '../entity/device-token.entity';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeviceTokenMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: DeviceTokenTypeormEntity): Promise<DeviceToken> {
        return entity ? new DeviceToken(entity.user.id, entity.token, entity.id) : null;
    }

    async toEntity(domain: DeviceToken): Promise<DeviceTokenTypeormEntity> {
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        return new DeviceTokenTypeormEntity(domain.token, user, domain.id);
    }
}
