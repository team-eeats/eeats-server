import { Injectable, Inject } from '@nestjs/common';
import { CommentAddedEvent } from '../../../application/domain/comment/event/comment.added.event';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class CommentEventHandler {
    constructor(
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort
    ) {}

    @OnEvent('CommentAddedEvent')
    async onCommentAdded(event: CommentAddedEvent) {
        const { suggestion } = event;

        const notification: Notification = {
            id: null,
            userId: suggestion.userId,
            topic: Topic.COMMENT,
            linkIdentifier: suggestion.id,
            title: '새로운 댓글이 달렸습니다.',
            content: `${suggestion.title}에 새로운 댓글이 달렸습니다.`,
            createdAt: LocalDate.now(),
            isRead: false
        };

        await this.fcmPort.sendMessageToDevice(notification.userId, notification);
    }
}
