import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PollPort } from '../../spi/poll.spi';

@Injectable()
export class DeletePollUseCase {
    constructor(
        @Inject(PollPort)
        private readonly pollPort: PollPort
    ) {}

    async execute(pollId: string) {
        const poll = await this.pollPort.queryPollById(pollId);
        if (!poll) {
            throw new NotFoundException('Poll Not Found');
        }

        await this.pollPort.deletePoll(poll);
    }
}
