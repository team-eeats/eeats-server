import { PollResponse, QueryAllPollsResponse, QueryPollResultsResponse } from '../dto/poll.dto';
import { Poll } from '../poll';

export interface PollPort {
    savePoll(poll: Poll): Promise<Poll>;

    queryAllPolls(): Promise<PollResponse[]>;

    queryPollById(pollId: string): Promise<Poll>;

    deletePoll(poll: Poll): Promise<void>;
}

export const PollPort = Symbol('IPollPort');
