import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NoticePostedEvent } from '../../../application/domain/notice/event/notice.posted.event';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';

@Injectable()
export class NoticeEventHandler {
    constructor(
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort
    ) {}

    @OnEvent('NoticePostedEvent')
    async onNoticePosted(event: NoticePostedEvent) {
        const { notice } = event;
        
        const notification: Notification = {
            id: null,
            userId: '',
            topic: Topic.NOTICE,
            linkIdentifier: notice.id,
            title: '공지사항이 등록되었습니다.',
            content: `${notice.title}`,
            createdAt: LocalDate.now(),
            isRead: false
        };

        await this.fcmPort.sendMessageToTopic(notification.topic, notification);
    }
}
