import { Notice } from '../../../../application/domain/notice/notice';
import { NoticeTypeormEntity } from './notice.entity';
import { Injectable } from '@nestjs/common';
import { LocalDate, nativeJs } from 'js-joda';
import { InjectRepository } from '@nestjs/typeorm'
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: NoticeTypeormEntity): Promise<Notice> {
        return entity
            ? new Notice(
                  entity.user.id,
                  entity.title,
                  entity.content,
                  entity.createdAt ? LocalDate.from(nativeJs(entity.createdAt)) : null,
                  entity.id
              )
            : null;
    }

    async toEntity(domain: Notice): Promise<NoticeTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        return new NoticeTypeormEntity(user, domain.title, domain.content, domain.id);
    }
}
