import { Injectable, Inject } from '@nestjs/common';
import { CommentAddedEvent } from '../../../application/domain/comment/event/comment.added.event';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { DeviceTokenPort } from 'src/application/domain/notification/spi/device-token.spi';

@Injectable()
export class CommentEventHandler {
    constructor(
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort,
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort,
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort
    ) {}

    @OnEvent('CommentAddedEvent')
    async onCommentAdded(event: CommentAddedEvent) {
        const { suggestion } = event;

        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(suggestion.userId);

        const notification: Notification = {
            userId: suggestion.userId,
            topic: Topic.COMMENT,
            linkIdentifier: suggestion.id,
            title: '새로운 댓글이 달렸습니다.',
            content: `${suggestion.title}에 새로운 댓글이 달렸습니다.`,
            createdAt: LocalDate.now(),
            isRead: false,
            id: undefined
        };

        await this.notificationPort.saveNotification(notification);

        await this.fcmPort.sendMessageToDevice(deviceToken.token, notification);
    }
}
