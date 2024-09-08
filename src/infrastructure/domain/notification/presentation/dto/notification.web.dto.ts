import { Topic } from '../../../../../application/domain/notification/model/notification';

export class SubscriptionWebRequest {
    deviceToken: string;
    topic: Topic;
}

export class SetDeviceTokenWebRequest {
    deviceToken: string;
}
