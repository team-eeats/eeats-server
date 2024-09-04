import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CommentResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { QuerySuggestionCommentUseCase } from '../../../../application/domain/comment/usecase/query-suggestion-comment.usecase';
import { CreateCommentUseCase } from '../../../../application/domain/comment/usecase/create-comment.usecase';
import { DeleteCommentUseCase } from '../../../../application/domain/comment/usecase/delete-comment.usecase';
import { CreateCommentWebRequest } from './dto/comment.web.dto';

@Controller('comments')
export class CommentWebAdapter {
    constructor(
        private readonly queryCommentUseCase: QuerySuggestionCommentUseCase,
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly deleteCommentUseCase: DeleteCommentUseCase
    ) {}

    @Get('/:suggestionId')
    async querySuggestionComment(
        @Param('suggestionId') suggestionId: string,
        @CurrentUser() user: User
    ): Promise<CommentResponse> {
        return await this.queryCommentUseCase.execute(suggestionId, user.id);
    }

    @HttpCode(204)
    @Permission([Authority.MANAGER])
    @Delete(':commentId')
    async deleteComment(
        @Param('commentId') commentId: string,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.deleteCommentUseCase.execute(commentId, user.id);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(201)
    @Post('/:suggestionId')
    async createComment(
        @Param('suggestionId') suggestionId: string,
        @Body() request: CreateCommentWebRequest,
        @CurrentUser() user: User
    ) {
        return await this.createCommentUseCase.execute(suggestionId, request, user.id);
    }
}
