import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PollOptionPort } from '../../spi/poll.option.spi';

@Injectable()
export class DeletePollOptionUseCase {
    constructor(
        @Inject(PollOptionPort)
        private readonly pollOptionPort: PollOptionPort
    ) {}

    async execute(pollOptionId: string): Promise<void> {
        const pollOption = await this.pollOptionPort.queryPollOptionById(pollOptionId);
        if (!pollOption) {
            throw new NotFoundException('Poll Option Not Found');
        }

        await this.pollOptionPort.deletePollOption(pollOption);
    }
}
