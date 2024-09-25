import { Injectable, Inject } from '@nestjs/common';
import { NotificationPort } from '../../../../application/domain/notification/spi/notification.spi';
import {
    Notification,
    Topic
} from '../../../../application/domain/notification/model/notification';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationTypeormEntity } from './entity/notification.entity';
import { NotificationMapper } from './mapper/notification.mapper';
import { FCMPort } from 'src/application/common/spi/fcm.spi';

@Injectable()
export class NotificationPersistenceAdapter implements NotificationPort {
    constructor(
        @InjectRepository(NotificationTypeormEntity)
        private readonly notificationRepository: Repository<NotificationTypeormEntity>,
        private readonly notificationMapper: NotificationMapper,
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort
    ) {}

    async saveNotification(notification: Notification): Promise<void> {
        const entity = await this.notificationMapper.toEntity(notification);
        await this.notificationRepository.save(entity);
    }

    async queryNotificationById(notificationId: string): Promise<Notification | null> {
        const entity = await this.notificationRepository.findOne({
            where: { id: notificationId },
            relations: ['user']
        });
        return entity ? this.notificationMapper.toDomain(entity) : null;
    }

    async queryNotificationByCondition(
        userId: string,
        isRead: boolean | null
    ): Promise<Notification[]> {
        const queryBuilder = this.notificationRepository
            .createQueryBuilder('notification')
            .where('notification.userId = :userId', { userId });

        if (isRead !== null) {
            queryBuilder.andWhere('notification.isRead = :isRead', { isRead });
        }

        const notifications = await queryBuilder
            .orderBy('notification.createdAt', 'DESC')
            .getMany();

        return Promise.all(notifications.map(this.notificationMapper.toDomain));
    }

    async queryNotificationByUserId(userId: string): Promise<Notification[]> {
        const notifications = await this.notificationRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
            order: { createdAt: 'DESC' }
        });
        return Promise.all(notifications.map(this.notificationMapper.toDomain));
    }
}
