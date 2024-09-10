import { Notification, Topic } from '../model/notification';

export interface NotificationPort {
    saveNotification(notification: Notification): Promise<void>;

    queryNotificationById(notificationId: string): Promise<Notification | null>;

    queryNotificationByCondition(userId: string, isRead: boolean | null): Promise<Notification[]>;

    queryNotificationByUserId(userId: string): Promise<Notification[]>;
}

export const NotificationPort = Symbol('INotificationPort');
