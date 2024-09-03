import { Injectable, Inject } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';
import { QueryAllSuggestionsResponse } from '../dto/suggestion.dto';

@Injectable()
export class QueryAllSuggestionsUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(): Promise<QueryAllSuggestionsResponse> {
        return {
            suggestions: await this.suggestionPort.queryAllSuggestions()
        };
    }
}
