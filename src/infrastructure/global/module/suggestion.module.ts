import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestionTypeormEntity } from '../../domain/suggestion/persistence/suggestion.entity';
import { SuggestionPersistenceAdapter } from '../../domain/suggestion/persistence/suggestion.persistence.adapter';
import { SuggestionPort } from '../../../application/domain/suggestion/spi/suggestion.spi';
import { SuggestionMapper } from '../../domain/suggestion/persistence/suggestion.mapper';
import { CreateSuggestionUseCase } from '../../../application/domain/suggestion/usecase/create-suggestion.usecase';
import { UpdateSuggestionUseCase } from '../../../application/domain/suggestion/usecase/update-suggestion.usecase';
import { QueryMySuggestionsUseCase } from '../../../application/domain/suggestion/usecase/query-my-suggestions.usecase';
import { DeleteSuggestionUseCase } from '../../../application/domain/suggestion/usecase/delete-suggestion.usecase';
import { SuggestionWebAdapter } from '../../domain/suggestion/presentation/suggestion.web.adapter';
import { QueryAllSuggestionsUseCase } from '../../../application/domain/suggestion/usecase/query-all-suggestions.usecase';
import { CommentTypeormEntity } from '../../domain/comment/persistence/comment.entity';
import { CommentPersistenceAdapter } from '../../domain/comment/persistence/comment.persistence.adapter';
import { CommentPort } from '../../../application/domain/comment/spi/comment.spi';

const SUGGESTION_PORT = { provide: SuggestionPort, useClass: SuggestionPersistenceAdapter };
const SUGGESTION_REPOSITORY = TypeOrmModule.forFeature([SuggestionTypeormEntity]);
const COMMENT_PORT = { provide: CommentPort, useClass: CommentPersistenceAdapter };
const COMMENT_REPOSITORY = TypeOrmModule.forFeature([CommentTypeormEntity]);

@Global()
@Module({
    imports: [SUGGESTION_REPOSITORY, COMMENT_REPOSITORY],
    providers: [
        SUGGESTION_PORT,
        COMMENT_PORT,
        SuggestionMapper,
        CreateSuggestionUseCase,
        UpdateSuggestionUseCase,
        QueryMySuggestionsUseCase,
        DeleteSuggestionUseCase,
        QueryAllSuggestionsUseCase
    ],
    exports: [SUGGESTION_PORT, COMMENT_PORT, SUGGESTION_REPOSITORY, COMMENT_REPOSITORY],
    controllers: [SuggestionWebAdapter]
})
export class SuggestionModule {}
