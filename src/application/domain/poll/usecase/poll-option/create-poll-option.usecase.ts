import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { PollOptionPort } from '../../spi/poll.option.spi';
import { PollOption } from '../../poll.option';
import { CreatePollOptionWebRequest } from '../../../../../infrastructure/domain/poll/presentation/dto/poll.option.web.dto';
import { PollPort } from '../../spi/poll.spi';

@Injectable()
export class CreatePollOptionUseCase {
    constructor(
        @Inject(PollOptionPort)
        private readonly pollOptionPort: PollOptionPort,
        @Inject(PollPort)
        private readonly pollPort: PollPort
    ) {}

    async execute(pollId: string, request: CreatePollOptionWebRequest) {
        const poll = await this.pollPort.queryPollById(pollId);
        if (!poll) {
            throw new NotFoundException('Poll Not Found');
        }
 
        const pollOption = new PollOption(pollId, request.description, undefined, request.imageUrl);

        return await this.pollOptionPort.savePollOption(pollOption);
    }
}
