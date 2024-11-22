import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocalDateTime, nativeJs } from 'js-joda';
import { PollOptionWithResultsReponse } from '../../../../application/domain/poll/dto/poll-option.dto';
import { Repository } from 'typeorm';
import { PollResponse } from '../../../../application/domain/poll/dto/poll.dto';
import { Poll } from '../../../../application/domain/poll/poll';
import { PollPort } from '../../../../application/domain/poll/spi/poll.spi';
import { PollOptionTypeormEntity } from './entity/poll-option.entity';
import { PollTypeormEntity } from './entity/poll.entity';
import { PollMapper } from './mapper/poll.mapper';

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

    async queryPollById(pollId: string): Promise<Poll> {
        return await this.pollMapper.toDomain(
            await this.pollRepository.findOne({
                where: {
                    id: pollId
                }
            })
        );
    }

    async deletePoll(poll: Poll): Promise<void> {
        await this.pollRepository.remove(await this.pollMapper.toEntity(poll));
    }

    async queryAllPolls(): Promise<PollResponse[]> {
        const pollEntities = await this.pollRepository.find({
            relations: ['pollOptions', 'pollOptions.votes'],
            order: {
                createdAt: 'desc'
            }
        });

        return pollEntities.map((pollEntity) => {
            const totalVotes = this.calculateTotalVotes(pollEntity.pollOptions);

            const options = pollEntity.pollOptions.map(({ id, description, imageUrl, votes }) => {
                const voteCount = votes.length;
                const voteRate = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

                return {
                    id,
                    description,
                    imageUrl,
                    voteCount,
                    voteRate
                } as PollOptionWithResultsReponse;
            });

            const now = LocalDateTime.now();
            const startDate = LocalDateTime.from(nativeJs(pollEntity.startDate));
            const endDate = LocalDateTime.from(nativeJs(pollEntity.endDate));
            const isActive = now.isAfter(startDate) && now.isBefore(endDate);

            return {
                id: pollEntity.id,
                title: pollEntity.title,
                description: pollEntity.description,
                startDate: pollEntity.startDate,
                endDate: pollEntity.endDate,
                createdAt: pollEntity.createdAt
                    ? LocalDateTime.from(nativeJs(pollEntity.createdAt))
                    : null,
                isActive: isActive,
                options: options
            } as PollResponse;
        });
    }

    private calculateTotalVotes(options: PollOptionTypeormEntity[]): number {
        return options.reduce((total, option) => total + option.votes.length, 0);
    }
}
