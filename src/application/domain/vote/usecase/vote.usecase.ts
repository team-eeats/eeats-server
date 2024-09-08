import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PollOptionPort } from '../../poll/spi/poll-option.spi';
import { User } from '../../user/user';
import { VotePort } from '../spi/vote.spi';
import { Vote } from '../vote';

@Injectable()
export class VoteUseCase {
    constructor(
        @Inject(VotePort)
        private readonly votePort: VotePort,
        @Inject(PollOptionPort)
        private readonly pollOptionPort: PollOptionPort
    ) {}

    async execute(pollOptionId: string, user: User) {
        const pollOption = await this.pollOptionPort.queryPollOptionById(pollOptionId);
        if (!pollOption) {
            throw new NotFoundException('Poll Option Not Found');
        }

        const existingVote = await this.votePort.queryVoteByPollOptionAndUser(
            pollOptionId,
            user.id
        );
        if (existingVote) {
            throw new ConflictException('Already Voted');
        }

        const vote = new Vote(pollOptionId, user.id);
        return this.votePort.saveVote(vote);
    }
}
