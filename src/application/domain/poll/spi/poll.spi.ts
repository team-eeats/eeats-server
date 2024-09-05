import { PollResponse, QueryPollResultsResponse } from '../dto/poll.dto';
import { Poll } from '../poll';

export interface PollPort {
    savePoll(poll: Poll): Promise<Poll>;
    
    queryAllPolls(): Promise<PollResponse[]>;

}

export const PollPort = Symbol('IPollPort');
