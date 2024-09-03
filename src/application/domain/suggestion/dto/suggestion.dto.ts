import { LocalDate } from 'js-joda';

export class SuggestionResponse {
    id: string;
    title: string;
    content: string;
    createdAt: LocalDate;
}

export class SuggestionRequest {
    title: string;
    content: string;
}

export class QueryMySuggestionsResponse {
    suggestions: SuggestionResponse[];
}
