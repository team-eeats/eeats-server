import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PollPort } from '../../spi/poll.spi';

@Injectable()
export class ToggleHiddenUseCase {
    constructor(
        @Inject(PollPort)
        private readonly pollPort: PollPort,
    ) {}

    async execute(id: string) {
        const poll = await this.pollPort.queryPollById(id);
        if (!poll) {
            throw new NotFoundException("Poll Not Found");
        }

        poll.toggleHidden();
    }
}
