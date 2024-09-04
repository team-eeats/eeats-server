import { Global, Module } from '@nestjs/common';
import { CommentWebAdapter } from '../../domain/comment/presentation/commet.web.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTypeormEntity } from '../../domain/comment/persistence/comment.entity';
import { CommentPort } from '../../../application/domain/comment/spi/comment.spi';  
import { CommentPersistenceAdapter } from '../../domain/comment/persistence/comment.persistence.adapter';
import { QuerySuggestionCommentUseCase } from '../../../application/domain/comment/usecase/query-suggestion-comment.usecase';
import { CreateCommentUseCase } from '../../../application/domain/comment/usecase/create-comment.usecase';
import { DeleteCommentUseCase } from '../../../application/domain/comment/usecase/delete-comment.usecase';
import { CommentMapper } from '../../domain/comment/persistence/comment.mapper';

const COMMENT_REPOSITORY = TypeOrmModule.forFeature([CommentTypeormEntity]);
const COMMENT_PORT = { provide: CommentPort, useClass: CommentPersistenceAdapter };

@Global()
@Module({
    imports: [COMMENT_REPOSITORY],
    providers: [
        COMMENT_PORT,
        CommentMapper,
        QuerySuggestionCommentUseCase,
        CreateCommentUseCase,
        DeleteCommentUseCase
    ],
    exports: [COMMENT_REPOSITORY, COMMENT_PORT],
    controllers: [ CommentWebAdapter ]
})
export class CommentModule {}
