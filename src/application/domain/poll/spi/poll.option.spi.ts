import { PollOption } from '../poll.option';
import { PollOptionResponse } from '../dto/poll.option.dto';
import { QueryPollResultsResponse } from '../dto/poll.dto';

export interface PollOptionPort {
    savePollOption(pollOption: PollOption): Promise<PollOption>;

    queryPollOptionById(pollOptionId: string): Promise<PollOption>;

    queryAllPollOptions(): Promise<PollOptionResponse[]>;

    queryPollOptionResults(pollOptionId: string): Promise<QueryPollResultsResponse>;

    deletePollOption(pollOption: PollOption): Promise<void>;
}

export const PollOptionPort = Symbol('IPollOptionPort');
