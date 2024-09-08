import { Injectable } from '@nestjs/common';
import { TopicSubscriptionPort } from '../../../../application/domain/notification/spi/topic-subscription.spi';
import { TopicSubscription } from '../../../../application/domain/notification/model/topic-subscription';
import { Topic } from '../../../../application/domain/notification/model/notification';
import { InjectRepository } from '@nestjs/typeorm';
import { TopicSubscriptionTypeormEntity } from './entity/topic-subscription.entity';
import { Repository } from 'typeorm';
import { TopicSubscriptionMapper } from './mapper/topic-subscription.mapper';
import { DeviceTokenTypeormEntity } from './entity/device-token.entity';

@Injectable()
export class TopicSubscriptionPersistenceAdapter implements TopicSubscriptionPort {
    constructor(
        @InjectRepository(TopicSubscriptionTypeormEntity)
        private readonly topicSubscriptionRepository: Repository<TopicSubscriptionTypeormEntity>,
        private readonly topicSubscriptionMapper: TopicSubscriptionMapper,
        @InjectRepository(DeviceTokenTypeormEntity)
        private readonly deviceTokenRepository: Repository<DeviceTokenTypeormEntity>
    ) {}

    async saveTopicSubscription(subscription: TopicSubscription): Promise<void> {
        const entity = await this.topicSubscriptionMapper.toEntity(subscription);
        await this.topicSubscriptionRepository.save(entity);
    }

    async queryByDeviceTokenIdAndTopic(
        deviceTokenId: string,
        topic: Topic
    ): Promise<TopicSubscription | null> {
        const entity = await this.topicSubscriptionRepository.findOne({
            where: { deviceTokenId, topic },
            relations: { deviceToken: true }
        });
        return this.topicSubscriptionMapper.toDomain(entity);
    }

    async deleteTopicSubscription(deviceTokenId: string, topic: Topic): Promise<void> {
        await this.topicSubscriptionRepository.delete({
            deviceTokenId,
            topic
        });
    }
}
