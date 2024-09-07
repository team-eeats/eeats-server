import { Injectable, Inject } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';
import { QueryAllSuggestionsResponse } from '../dto/suggestion.dto';
import { CommentPort } from '../../comment/spi/comment.spi';

@Injectable()
export class QueryAllSuggestionsUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort,
        @Inject(CommentPort)
        private readonly commentPort: CommentPort
    ) {}

    async execute(): Promise<QueryAllSuggestionsResponse> {
        const suggestions = await this.suggestionPort.queryAllSuggestions();
        
        const suggestionsWithComment = await Promise.all(suggestions.map(async (suggestion) => {
            const comment = await this.commentPort.querySuggestionComment(suggestion.id, null);
            return {
                ...suggestion,
                comment: comment
            };
        }));

        return {
            suggestions: suggestionsWithComment
        };
    }
}
