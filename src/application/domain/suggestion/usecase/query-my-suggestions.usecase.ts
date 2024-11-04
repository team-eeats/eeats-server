import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user';
import { SuggestionPort } from '../spi/suggestion.spi';
import { SuggestionResponse, QueryMySuggestionsResponse } from '../dto/suggestion.dto';
import { CommentPort } from '../../../domain/comment/spi/comment.spi';

@Injectable()
export class QueryMySuggestionsUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort,
        @Inject(CommentPort)
        private readonly commentPort: CommentPort
    ) {}

    async execute(user: User): Promise<QueryMySuggestionsResponse> {
        const suggestions = await this.suggestionPort.querySuggestionByUserId(user.id);

        const suggestionsWithComments = await Promise.all(
            suggestions.map(async (suggestion): Promise<SuggestionResponse> => {
                const comment = await this.commentPort.querySuggestionComment(suggestion.id);

                return {
                    id: suggestion.id,
                    title: suggestion.title,
                    content: suggestion.content,
                    createdAt: suggestion.createdAt,
                    accountId: user.accountId,
                    comment: comment ?? null
                };
            })
        );

        return {
            suggestions: suggestionsWithComments
        };
    }
}
