import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { CreateCommentWebRequest } from '../../../../infrastructure/domain/comment/presentation/dto/comment.web.dto';
import { SuggestionPort } from '../../suggestion/spi/suggestion.spi';
import { Comment } from '../comment';

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort,
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(suggestionId: string, request: CreateCommentWebRequest, userId: string) {
        const suggestion = await this.suggestionPort.querySuggestionById(suggestionId);
        if (!suggestion) {
            throw new NotFoundException('Suggestion Not Found');
        }

        await this.commentPort.saveComment(new Comment(request.content, userId, suggestion.id));
    }
}
