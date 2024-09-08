import { Injectable, Inject } from '@nestjs/common';
import { TopicSubscriptionPort } from '../spi/topic-subscription.spi';
import { TopicSubscription } from '../model/topic-subscription';

@Injectable()
export class SubscribeTopicUseCase {
    constructor(
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort
    ) {}

    async execute(subscription: TopicSubscription): Promise<void> {
        await this.topicSubscriptionPort.saveTopicSubscription(subscription);
    }
}
