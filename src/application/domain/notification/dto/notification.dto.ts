import { Topic } from '../model/notification';

export class TopicSubscriptionResponse {
    topic: Topic;
    isSubscribed: boolean;
}

export class QueryMySubscriptionsResponse {
    subscriptions: TopicSubscriptionResponse[];
}
