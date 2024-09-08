import { PollOptionResponse } from '../dto/poll-option.dto';
import { QueryPollResultsResponse } from '../dto/poll.dto';
import { PollOption } from '../poll-option';

export interface PollOptionPort {
    savePollOption(pollOption: PollOption): Promise<PollOption>;

    queryPollOptionById(pollOptionId: string): Promise<PollOption>;

    queryAllPollOptions(): Promise<PollOptionResponse[]>;

    queryPollOptionResults(pollOptionId: string): Promise<QueryPollResultsResponse>;

    deletePollOption(pollOption: PollOption): Promise<void>;
}

export const PollOptionPort = Symbol('IPollOptionPort');
