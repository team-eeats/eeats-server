import { Notification } from '../../domain/notification/model/notification';
import { Topic } from '../../domain/notification/model/notification';

export interface FCMPort {
  sendMessageToDevice(token: string, notification: Notification): Promise<void>;

  sendMessageToTopic(topic: string, notification: Notification): Promise<void>;

  subscribeTopic(token: string, topic: Topic): Promise<void>;

  unsubscribeTopic(token: string, topic: Topic): Promise<void>;
}

export const FCMPort = Symbol('IFCMPort');
