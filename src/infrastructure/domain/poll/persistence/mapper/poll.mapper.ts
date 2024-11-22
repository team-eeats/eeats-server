import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDateTime, nativeJs } from 'js-joda';
import { Poll } from '../../../../../application/domain/poll/poll';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { PollTypeormEntity } from '../entity/poll.entity';
import { PollOptionMapper } from './poll-option.mapper';

@Injectable()
export class PollMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly pollOptionMapper: PollOptionMapper
    ) {}

    async toDomain(entity: PollTypeormEntity): Promise<Poll> {
        const options = entity.pollOptions
            ? await Promise.all(
                  entity.pollOptions.map((option) => this.pollOptionMapper.toDomain(option))
              )
            : [];

        return new Poll(
            entity.title,
            entity.description,
            entity.startDate,
            entity.endDate,
            options,
            entity.createdAt ? LocalDateTime.from(nativeJs(entity.createdAt)) : null,
            entity.id
        );
    }

    async toEntity(domain: Poll): Promise<PollTypeormEntity> {
        return new PollTypeormEntity(domain.title, domain.description, domain.startDate, domain.endDate, domain.isActive, domain.id);
    }
}
