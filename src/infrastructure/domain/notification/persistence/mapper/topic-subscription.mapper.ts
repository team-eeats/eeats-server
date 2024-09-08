import { Injectable } from '@nestjs/common';
import { TopicSubscription } from '../../../../../application/domain/notification/model/topic-subscription';
import { TopicSubscriptionTypeormEntity } from '../entity/topic-subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceTokenTypeormEntity } from '../entity/device-token.entity';

@Injectable()
export class TopicSubscriptionMapper {
    constructor(
        @InjectRepository(DeviceTokenTypeormEntity)
        private readonly deviceTokenRepository: Repository<DeviceTokenTypeormEntity>
    ) {}

    async toDomain(entity: TopicSubscriptionTypeormEntity): Promise<TopicSubscription> {
        return entity
            ? new TopicSubscription(
                entity.deviceTokenId,
                entity.topic,
                entity.isSubscribed
            )
            : null;
    }

    async toEntity(domain: TopicSubscription): Promise<TopicSubscriptionTypeormEntity> {
        const deviceToken = await this.deviceTokenRepository.findOneBy({ id: domain.deviceTokenId });
        return new TopicSubscriptionTypeormEntity(
            deviceToken.id,
            deviceToken,
            domain.topic,
            domain.isSubscribed
        );
    }
}
