import { Poll } from '../../../../../application/domain/poll/poll';
import { PollTypeormEntity } from '../entity/poll.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDate, nativeJs } from 'js-joda';
import { PollOptionMapper } from './poll.option.mapper';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';

@Injectable()
export class PollMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        private readonly pollOptionMapper: PollOptionMapper
    ) {}

    async toDomain(entity: PollTypeormEntity): Promise<Poll> {
        let options = await Promise.all(entity.pollOptions.map(option => this.pollOptionMapper.toDomain(option)));
        return new Poll(
            entity.title,
            entity.description,
            options,
            entity.createdAt ? LocalDate.from(nativeJs(entity.createdAt)) : null,
            entity.id,
        );
    }

    async toEntity(domain: Poll): Promise<PollTypeormEntity> {
        return new PollTypeormEntity(
            domain.title,
            domain.description,
            domain.id
        );
    }
}
