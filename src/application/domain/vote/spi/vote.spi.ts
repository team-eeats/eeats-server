import { Vote } from '../vote';
import { VoteResponse } from '../dto/vote.dto';

export interface VotePort {
    saveVote(vote: Vote): Promise<Vote>;

    queryVoteById(voteId: string): Promise<Vote>;

    queryAllVotes(): Promise<VoteResponse[]>;

    queryVoteByPollOptionAndUser(pollOptionId: string, userId: string): Promise<Vote | null>;
}

export const VotePort = Symbol('IVotePort');
