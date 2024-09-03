import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuggestionTypeormEntity } from '../../domain/suggestion/persistence/suggestion.entity';
import { SuggestionPersistenceAdapter } from '../../domain/suggestion/persistence/suggestion.persistence.adapter';
import { SuggestionPort } from 'src/application/domain/suggestion/spi/suggestion.spi';
import { SuggestionMapper } from 'src/infrastructure/domain/suggestion/persistence/suggestion.mapper';
import { CreateSuggestionUseCase } from 'src/application/domain/suggestion/usecase/create-suggestion.usecase';
import { UpdateSuggestionUseCase } from 'src/application/domain/suggestion/usecase/update-suggestion.usecase';
import { QueryMySuggestionsUseCase } from 'src/application/domain/suggestion/usecase/query-my-suggestions.usecase';
import { DeleteSuggestionUseCase } from 'src/application/domain/suggestion/usecase/delete-suggestion.usecase';
import { SuggestionWebAdapter } from 'src/infrastructure/domain/suggestion/presentation/suggestion.web.adapter';

const SUGGESTION_PORT = { provide: SuggestionPort, useClass: SuggestionPersistenceAdapter };
const SUGGESTION_REPOSITORY = TypeOrmModule.forFeature([SuggestionTypeormEntity]);

@Global()
@Module({
    imports: [SUGGESTION_REPOSITORY],
    providers: [
        SUGGESTION_PORT,
        SuggestionMapper,
        CreateSuggestionUseCase,
        UpdateSuggestionUseCase,
        QueryMySuggestionsUseCase,
        DeleteSuggestionUseCase
    ],
    exports: [SUGGESTION_PORT, SUGGESTION_REPOSITORY],
    controllers: [SuggestionWebAdapter]
})
export class SuggestionModule {}
