import { Injectable, Inject } from '@nestjs/common';
import { TopicSubscriptionPort } from '../spi/topic-subscription.spi';
import { Topic } from '../model/notification';

@Injectable()
export class UnsubscribeTopicUseCase {
    constructor(
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort
    ) {}

    async execute(deviceTokenId: string, topic: Topic): Promise<void> {
        await this.topicSubscriptionPort.deleteTopicSubscription(deviceTokenId, topic);
    }
}
