import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentPort } from '../spi/comment.spi';

@Injectable()
export class DeleteCommentUseCase {
    constructor(
        @Inject(CommentPort)
        private readonly commentPort: CommentPort
    ) {}

    async execute(commentId: string, currentUserId: string) {
        const comment = await this.commentPort.queryCommentById(commentId);
        if (!comment) {
            throw new NotFoundException('Comment Not Found');
        }

        if (comment.userId !== currentUserId) {
            throw new ForbiddenException('Invalid User');
        }

        await this.commentPort.deleteComment(comment);
    }
}
