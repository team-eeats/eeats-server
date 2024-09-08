import { Notification } from '../model/notification';

export interface NotificationPort {
    saveNotification(notification: Notification): Promise<void>;

    queryNotificationByUserId(userId: string): Promise<Notification[]>;
}

export const NotificationPort = Symbol('INotificationPort');
