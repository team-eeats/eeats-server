import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { NotificationPort } from '../spi/notification.spi';

@Injectable()
export class ReadNotificationUseCase {
    constructor(
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort
    ) {}

    async execute(notificationId: string): Promise<void> {
        const notification = await this.notificationPort.queryNotificationById(notificationId);

        if (!notification) {
            throw new NotFoundException('Notification Not Found');
        }

        notification.isRead = true;

        await this.notificationPort.saveNotification(notification);
    }
}
