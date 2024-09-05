import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VotePort } from '../../../application/domain/vote/spi/vote.spi';
import { VoteTypeormEntity } from './vote.entity';
import { VoteMapper } from './vote.mapper';
import { Vote } from '../../../application/domain/vote/vote';
import { VoteResponse } from '../../../application/domain/vote/dto/vote.dto';

@Injectable()
export class VotePersistenceAdapter implements VotePort {
    constructor(
        @InjectRepository(VoteTypeormEntity)
        private readonly voteRepository: Repository<VoteTypeormEntity>,
        private readonly voteMapper: VoteMapper
    ) {}

    async saveVote(vote: Vote): Promise<Vote> {
        const entity = await this.voteMapper.toEntity(vote);

        return this.voteMapper.toDomain(await this.voteRepository.save(entity));
    }

    async queryVoteById(voteId: string): Promise<Vote> {
        return await this.voteMapper.toDomain(
            await this.voteRepository.findOne({
                where: {
                    id: voteId
                },
                relations: ['poll', 'user', 'pollOption']
            })
        );
    }

    async queryAllVotes(): Promise<VoteResponse[]> {
        const votes = await this.voteRepository.find({
            relations: ['pollOption', 'user']
        });

        return votes.map((vote) => ({
            id: vote.id,
            userId: vote.user.id,
            pollOptionId: vote.option.id
        }));
    }
}
