import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { QueryMySuggestionsResponse } from '../../suggestion/dto/suggestion.dto';
import { SuggestionPort } from '../../suggestion/spi/suggestion.spi';
import { CommentResponse } from '../dto/comment.dto';

@Injectable()
export class QuerySuggestionCommentUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort,
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(suggestionId: string, userId: string): Promise<CommentResponse> {
        if (!await this.suggestionPort.existsSuggestionById(suggestionId)) {
            throw new NotFoundException('Suggestion Not Found');
        }

        const comment = await this.commentPort.querySuggestionComment(suggestionId, userId);

        return comment;
    }
}
