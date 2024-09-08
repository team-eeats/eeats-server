import { Injectable, Inject } from '@nestjs/common';
import { DeviceTokenPort } from '../../../../application/domain/notification/spi/device-token.spi';
import { TopicSubscriptionPort } from '../../../../application/domain/notification/spi/topic-subscription.spi';
import { QueryMySubscriptionsResponse } from '../dto/notification.dto';

@Injectable()
export class QueryTopicSubscriptionUseCase {
    constructor(
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort,
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort
    ) {}

    async execute(deviceToken: string): Promise<QueryMySubscriptionsResponse> {
        const deviceTokenId = await this.deviceTokenPort.queryDeviceTokenIdByDeviceToken(deviceToken);
        
        if (!deviceTokenId) {
            return { subscriptions: [] };
        }

        const subscriptions = await this.topicSubscriptionPort.queryTopicSubscriptionByDeviceTokenId(deviceTokenId);

        return {
            subscriptions: subscriptions.map(({ topic, isSubscribed }) => ({
                topic,
                isSubscribed
            }))
        };
    }
}
