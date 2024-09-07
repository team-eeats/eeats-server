import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { VotePort } from '../spi/vote.spi';
import { Vote } from '../vote';
import { PollOptionPort } from '../../poll/spi/poll.option.spi';
import { User } from '../../user/user';

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

        const vote = new Vote(pollOptionId, user.id);
        return this.votePort.saveVote(vote);
    }
}
