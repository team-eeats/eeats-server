import { LocalDate } from 'js-joda';
import { Topic } from '../model/notification';

export class TopicSubscriptionResponse {
    topic: Topic;
    isSubscribed: boolean;
}

export class QueryMySubscriptionsResponse {
    subscriptions: TopicSubscriptionResponse[];
}

export class NotificationResponse {
    id: string;
    title: string;
    content: string;
    isRead: boolean;
    topic: Topic;
    linkIdentifier: string | null;
    createdAt: LocalDate
}

export class QueryNotificationsResponse {
    notifications: NotificationResponse[];
}
