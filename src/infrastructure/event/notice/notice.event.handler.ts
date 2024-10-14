import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NoticePostedEvent } from '../../../application/domain/notice/event/notice.posted.event';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';
import { LocalDate } from 'js-joda';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../domain/user/persistence/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeEventHandler {
    constructor(
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort,
        @Inject(NotificationPort)
        private readonly notificationPort: NotificationPort,
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    @OnEvent('NoticePostedEvent')
    async onNoticePosted(event: NoticePostedEvent) {
        const { notice } = event;

        const users = await this.userRepository.find();

        for (const user of users) {
            const notification: Notification = {
                userId: user.id,
                topic: Topic.NOTICE,
                linkIdentifier: notice.id,
                title: '공지사항이 등록되었습니다.',
                content: `${notice.title}`,
                createdAt: LocalDate.now(),
                isRead: false,
                id: undefined
            };

            await this.notificationPort.saveNotification(notification);

            await this.fcmPort.sendMessageToTopic(notification.topic, notification);
        }
    }
}
