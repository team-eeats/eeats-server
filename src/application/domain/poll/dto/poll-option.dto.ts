export class PollOptionResponse {
    id: string;
    description: string;
    imageUrl?: string;
}

export class PollOptionResultsResponse {
    id: string;
    voteCount: number;
    voteRate: number;
}

export class PollOptionWithResultsReponse {
    id: string;
    description: string;
    imageUrl?: string;
    voteCount: number;
    voteRate: number;
}
