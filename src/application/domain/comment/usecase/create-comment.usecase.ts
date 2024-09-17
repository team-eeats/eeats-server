import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';
import { CreateCommentWebRequest } from '../../../../infrastructure/domain/comment/presentation/dto/comment.web.dto';
import { SuggestionPort } from '../../suggestion/spi/suggestion.spi';
import { Comment } from '../comment';
import { CreateCommentResponse } from '../dto/comment.dto';
import { PublishEventPort } from '../../../common/spi/event.spi';
import { CommentAddedEvent } from '../../../domain/comment/event/comment.added.event';

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort,
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort,
        @Inject(PublishEventPort)
        private readonly publishEventPort: PublishEventPort
    ) {}

    async execute(suggestionId: string, request: CreateCommentWebRequest, userId: string): Promise<CreateCommentResponse> {
        const suggestion = await this.suggestionPort.querySuggestionById(suggestionId);
        
        if (!suggestion) {
            throw new NotFoundException('Suggestion Not Found');
        }

        const comment = await this.commentPort.saveComment(new Comment(request.content, userId, suggestion.id));

        await this.publishEventPort.publishEvent(new CommentAddedEvent(suggestion));

        return new CreateCommentResponse(comment.id);
    }
}
