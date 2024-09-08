import { Topic } from './notification';

export class TopicSubscription {
    deviceTokenId: string;
    topic: Topic;
    isSubscribed: boolean;

    constructor(deviceTokenId: string, topic: Topic, isSubscribed: boolean) {
        this.deviceTokenId = deviceTokenId;
        this.topic = topic;
        this.isSubscribed = isSubscribed;
    }
}
