import { Injectable } from '@nestjs/common';
import { PollOption } from '../../../../../application/domain/poll/poll.option';
import { PollOptionTypeormEntity } from '../entity/poll.option.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { PollTypeormEntity } from '../entity/poll.entity';

@Injectable()
export class PollOptionMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        @InjectRepository(PollTypeormEntity)
        private readonly pollRepository: Repository<PollTypeormEntity>
    ) {}

    async toDomain(entity: PollOptionTypeormEntity): Promise<PollOption> {
        return new PollOption(
            entity.poll.id,
            entity.description,
            entity.user.id,
            entity.id,
            entity.imageUrl
        );
    }

    async toEntity(domain: PollOption): Promise<PollOptionTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        let poll = await this.pollRepository.findOneBy({ id: domain.pollId });
        return new PollOptionTypeormEntity(
            user,
            poll,
            domain.id,
            domain.description,
            domain.imageUrl
        );
    }
}
