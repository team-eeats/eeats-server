import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../../../../../application/domain/notification/model/notification';
import { NotificationTypeormEntity } from '../entity/notification.entity';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { convert, LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class NotificationMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: NotificationTypeormEntity): Promise<Notification> {
        return entity
            ? new Notification(
                  entity.user.id,
                  entity.topic,
                  entity.linkIdentifier,
                  entity.title,
                  entity.content,
                  entity.isRead,
                  entity.createdAt ? LocalDate.from(nativeJs(entity.createdAt)) : null,
                  entity.id
              )
            : null;
    }

    async toEntity(domain: Notification): Promise<NotificationTypeormEntity> {
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        return new NotificationTypeormEntity(
            user,
            domain.topic,
            domain.title,
            domain.content,
            domain.linkIdentifier,
            domain.isRead,
            domain.createdAt ? convert(domain.createdAt).toDate() : null
        );
    }
}
