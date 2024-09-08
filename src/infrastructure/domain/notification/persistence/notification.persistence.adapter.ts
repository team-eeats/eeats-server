import { Injectable } from '@nestjs/common';
import { NotificationPort } from '../../../../application/domain/notification/spi/notification.spi';
import { Notification } from '../../../../application/domain/notification/model/notification';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTypeormEntity } from './entity/notification.entity';
import { NotificationMapper } from './mapper/notification.mapper';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Injectable()
export class NotificationPersistenceAdapter implements NotificationPort {
    constructor(
        @InjectRepository(NotificationTypeormEntity)
        private readonly notificationRepository: Repository<NotificationTypeormEntity>,
        private readonly notificationMapper: NotificationMapper,
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async saveNotification(notification: Notification): Promise<void> {
        const entity = await this.notificationMapper.toEntity(notification);
        await this.notificationRepository.save(entity);
    }

    async queryNotificationByUserId(userId: string): Promise<Notification[]> {
        const entities = await this.notificationRepository.find({
            where: { user: { id: userId } },
            relations: { user: true }
        });
        return Promise.all(entities.map((entity) => this.notificationMapper.toDomain(entity)));
    }
}
