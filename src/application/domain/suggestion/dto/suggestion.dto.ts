import { LocalDate } from 'js-joda';
import { CommentResponse } from '../../comment/dto/comment.dto';

export class SuggestionResponse {
    id: string;
    title: string;
    content: string;
    createdAt: LocalDate;
    accountId: string;
    comment?: CommentResponse | null;
}

export class SuggestionRequest {
    title: string;
    content: string;
}

export class QueryMySuggestionsResponse {
    suggestions: SuggestionResponse[];
}

export class QueryAllSuggestionsResponse {
    suggestions: SuggestionResponse[]; // SuggestionResponse 자체에 comment 포함
}


export class CreateSuggestionResponse {
    constructor(private readonly id: string) {}
}
