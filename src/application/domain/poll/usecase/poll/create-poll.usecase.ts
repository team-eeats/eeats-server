import { Inject, Injectable } from '@nestjs/common';
import { LocalDate } from 'js-joda';
import { CreatePollWebRequest } from '../../../../../infrastructure/domain/poll/presentation/dto/poll.web.dto';
import { Poll } from '../../poll';
import { PollOption } from '../../poll-option';
import { PollOptionPort } from '../../spi/poll-option.spi';
import { PollPort } from '../../spi/poll.spi';

@Injectable()
export class CreatePollUseCase {
    constructor(
        @Inject(PollPort)
        private readonly pollPort: PollPort,
        @Inject(PollOptionPort)
        private readonly pollOptionPort: PollOptionPort
    ) {}

    async execute(request: CreatePollWebRequest) {
        const poll = new Poll(request.title, request.description || null, [], LocalDate.now());

        const savedPoll = await this.pollPort.savePoll(poll);

        if (request.pollOptions) {
            const pollOptions = request.pollOptions.map(
                (option) =>
                    new PollOption(savedPoll.id, option.description, undefined, option.imageUrl)
            );

            for (const pollOption of pollOptions) {
                await this.pollOptionPort.savePollOption(pollOption);
            }
        }
    }
}
