import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from '../../../../application/domain/vote/vote';
import { PollOptionTypeormEntity } from '../../poll/persistence/entity/poll-option.entity';
import { PollTypeormEntity } from '../../poll/persistence/entity/poll.entity';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { VoteTypeormEntity } from './vote.entity';

@Injectable()
export class VoteMapper {
    constructor(
        @InjectRepository(VoteTypeormEntity)
        private readonly voteRepository: Repository<VoteTypeormEntity>,
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        @InjectRepository(PollTypeormEntity)
        private readonly pollRepository: Repository<PollTypeormEntity>,
        @InjectRepository(PollOptionTypeormEntity)
        private readonly pollOptionRepository: Repository<PollOptionTypeormEntity>
    ) {}

    async toDomain(entity: VoteTypeormEntity): Promise<Vote> {
        return entity ? new Vote(entity.pollOption.id, entity.user.id, entity.id) : null;
    }

    async toEntity(domain: Vote): Promise<VoteTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        let option = await this.pollOptionRepository.findOneBy({ id: domain.pollOptionId });

        return new VoteTypeormEntity(option, user, domain.id);
    }
}
