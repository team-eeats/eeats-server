import { Inject, Injectable } from '@nestjs/common';
import { PollPort } from '../spi/poll.spi';
import { QueryAllPollsResponse } from '../dto/poll.dto';

@Injectable()
export class QueryAllPollsUseCase {
    constructor(
        @Inject(PollPort)
        private readonly pollPort: PollPort
    ) {}

    async execute(): Promise<QueryAllPollsResponse> {
        return {
            polls: await this.pollPort.queryAllPolls()
        };
    }
}
