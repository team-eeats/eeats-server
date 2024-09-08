import { Injectable } from '@nestjs/common';
import { DeviceTokenPort } from '../../../../application/domain/notification/spi/device-token.spi';
import { DeviceToken } from '../../../../application/domain/notification/model/device-token';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceTokenTypeormEntity } from './entity/device-token.entity';
import { Repository } from 'typeorm';
import { DeviceTokenMapper } from './mapper/device-token.mapper';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Injectable()
export class DeviceTokenPersistenceAdapter implements DeviceTokenPort {
    constructor(
        @InjectRepository(DeviceTokenTypeormEntity)
        private readonly deviceTokenRepository: Repository<DeviceTokenTypeormEntity>,
        private readonly deviceTokenMapper: DeviceTokenMapper,
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async saveDeviceToken(deviceToken: DeviceToken): Promise<void> {
        const entity = await this.deviceTokenMapper.toEntity(deviceToken);
        await this.deviceTokenRepository.save(entity);
    }

    async queryDeviceTokenByUserId(userId: string): Promise<DeviceToken | null> {
        const entity = await this.deviceTokenRepository.findOne({
            where: { user: { id: userId } },
            relations: { user: true }
        });
        return this.deviceTokenMapper.toDomain(entity);
    }
}
