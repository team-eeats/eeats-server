import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PollOptionPort } from '../../../../application/domain/poll/spi/poll.option.spi';
import { PollOption } from '../../../../application/domain/poll/poll.option';
import { PollOptionResponse } from '../../../../application/domain/poll/dto/poll.option.dto';
import { PollOptionTypeormEntity } from './entity/poll.option.entity';
import { PollOptionMapper } from './mapper/poll.option.mapper';
import { QueryPollResultsResponse } from '../../../../application/domain/poll/dto/poll.dto';
import { VoteTypeormEntity } from '../../vote/vote.entity';

@Injectable()
export class PollOptionPersistenceAdapter implements PollOptionPort {
    constructor(
        @InjectRepository(PollOptionTypeormEntity)
        private readonly pollOptionRepository: Repository<PollOptionTypeormEntity>,
        @InjectRepository(VoteTypeormEntity)
        private readonly voteRepository: Repository<VoteTypeormEntity>,
        private readonly pollOptionMapper: PollOptionMapper
    ) {}

    async savePollOption(pollOption: PollOption): Promise<PollOption> {
        const entity = await this.pollOptionMapper.toEntity(pollOption);
        const savedEntity = await this.pollOptionRepository.save(entity);
        return this.pollOptionMapper.toDomain(savedEntity);
    }

    async queryPollOptionById(id: string): Promise<PollOption> {
        const entity = await this.pollOptionRepository.findOne({
            where: { id },
            relations: ['votes']
        });

        if (!entity) {
            throw new NotFoundException('Poll Option Not Found');
        }

        return this.pollOptionMapper.toDomain(entity);
    }

    async queryAllPollOptions(): Promise<PollOptionResponse[]> {
        const entities = await this.pollOptionRepository.find({
            relations: ['poll']
        });

        return Promise.all(
            entities.map(async (entity) => this.pollOptionMapper.toDomain(entity))
        );
    }

    async queryPollOptionResults(pollId: string): Promise<QueryPollResultsResponse> {
        const pollOptions = await this.pollOptionRepository.find({
            where: { poll: { id: pollId } },
            relations: ['votes']
        });

        if (!pollOptions.length) {
            throw new NotFoundException('Poll Not Found');
        }

        const totalVotes = this.calculateTotalVotes(pollOptions);
        const options = this.mapOptions(pollOptions, totalVotes);

        return {
            id: pollId,
            options,
        };
    }

    private calculateTotalVotes(pollOptions: PollOptionTypeormEntity[]): number {
        return pollOptions.reduce((sum, option) => sum + option.votes.length, 0);
    }

    private mapOptions(pollOptions: PollOptionTypeormEntity[], totalVotes: number): { id: string; voteCount: number; voteRate: number }[] {
        return pollOptions.map(option => {
            const voteCount = option.votes.length;
            const voteRate = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

            return {
                id: option.id,
                voteCount,
                voteRate,
            };
        });
    }
}
