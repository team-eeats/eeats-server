import { Injectable, Inject } from '@nestjs/common';
import { NotificationPort } from '../spi/notification.spi';
import { QueryNotificationsResponse, NotificationResponse } from '../dto/notification.dto';
import { User } from '../../user/user';

@Injectable()
export class QueryAllNotificationsUseCase {
    constructor(
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort
    ) {}

    async execute(user: User): Promise<QueryNotificationsResponse> {
        const notifications = await this.notificationPort.queryNotificationByUserId(user.id);

        return {
            notifications: notifications.map((notification): NotificationResponse => {
                return {
                    id: notification.id,
                    title: notification.title,
                    content: notification.content,
                    isRead: notification.isRead,
                    topic: notification.topic,
                    linkIdentifier: notification.linkIdentifier,
                    createdAt: notification.createdAt
                }
            })
        }
    }
}
