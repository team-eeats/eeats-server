export class PollOptionResponse {
    id: string;
    userId: string;
    description: string;
    imageUrl?: string;
}

export class PollOptionResultsResponse {
    id: string;
    voteCount: number;
    voteRate: number;
}
