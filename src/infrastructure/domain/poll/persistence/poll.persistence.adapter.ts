import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PollTypeormEntity } from './entity/poll.entity';
import { PollPort } from '../../../../application/domain/poll/spi/poll.spi';
import { Poll } from '../../../../application/domain/poll/poll';
import { PollMapper } from './mapper/poll.mapper';
import {
    PollResponse,
    QueryPollResultsResponse
} from '../../../../application/domain/poll/dto/poll.dto';

@Injectable()
export class PollPersistenceAdapter implements PollPort {
    constructor(
        @InjectRepository(PollTypeormEntity)
        private readonly pollRepository: Repository<PollTypeormEntity>,
        private readonly pollMapper: PollMapper
    ) {}

    async savePoll(poll: Poll): Promise<Poll> {
        const entity = await this.pollMapper.toEntity(poll);

        return this.pollMapper.toDomain(await this.pollRepository.save(entity));
    }

    async queryAllPolls(): Promise<PollResponse[]> {
        const polls = await this.pollRepository.find({ relations: ['options'] });
        return Promise.all(polls.map(async (poll) => this.pollMapper.toDomain(poll)));
    }
}
