import { Inject, Injectable } from '@nestjs/common';
import { PollPort } from '../../spi/poll.spi';
import { UpdatePollRequest } from '../../dto/poll.dto';

@Injectable()
export class UpdatePollUseCase {
    constructor(
        @Inject(PollPort)
        private readonly pollPort: PollPort
    ) {}

    async execute(pollId: string, request: UpdatePollRequest): Promise<void> {
        const poll = await this.pollPort.queryPollById(pollId);

        poll.update(request.title, request.description);
        await this.pollPort.savePoll(poll);
    }
}
