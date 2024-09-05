import { LocalDate } from 'js-joda';
import { PollOptionResponse, PollOptionResultsResponse } from './poll.option.dto';

export class PollResponse {
    id: string;
    title: string;
    description?: string;
    createdAt: LocalDate;
    options: PollOptionResponse[];
}

export class UpdatePollRequest {
    title: string;
    description: string;
}

export class QueryPollResultsResponse {
    id: string;
    options: PollOptionResultsResponse[];
}
