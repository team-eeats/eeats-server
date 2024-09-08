import { TopicSubscription } from '../model/topic-subscription';
import { Topic } from '../model/notification';

export interface TopicSubscriptionPort {
    saveTopicSubscription(subscription: TopicSubscription): Promise<void>;

    queryByDeviceTokenIdAndTopic(
        deviceTokenId: string,
        topic: Topic
    ): Promise<TopicSubscription | null>;
}

export const TopicSubscriptionPort = Symbol('ITopicSubscriptionPort');
