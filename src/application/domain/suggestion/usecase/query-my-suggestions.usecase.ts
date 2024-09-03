import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user';
import { SuggestionPort } from '../spi/suggestion.spi';
import { SuggestionResponse, QueryMySuggestionsResponse } from '../dto/suggestion.dto';

@Injectable()
export class QueryMySuggestionsUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(user: User): Promise<QueryMySuggestionsResponse> {
        const suggestions = await this.suggestionPort.querySuggestionByUserId(user.id);

        return {
            suggestions: suggestions.map((suggestion): SuggestionResponse => {
                return {
                    id: suggestion.id,
                    title: suggestion.title,
                    content: suggestion.content,
                    createdAt: suggestion.createdAt
                };
            })
        };
    }
}
