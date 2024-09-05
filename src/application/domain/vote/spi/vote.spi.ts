import { Vote } from '../vote';
import { VoteResponse } from '../dto/vote.dto';

export interface VotePort {
    saveVote(vote: Vote): Promise<Vote>;

    queryVoteById(voteId: string): Promise<Vote>;

    queryAllVotes(): Promise<VoteResponse[]>;
}

export const VotePort = Symbol('IVotePort');
