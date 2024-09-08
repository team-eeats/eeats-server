import { Topic } from './notification';

export class TopicSubscription {
    deviceTokenId: string;
    topic: Topic;
    isSubscribed: boolean;
}
