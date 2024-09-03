import { Body, Controller, Get, HttpCode, Param, Post, Delete, Patch } from '@nestjs/common';
import { CreateSuggestionUseCase } from '../../../../application/domain/suggestion/usecase/create-suggestion.usecase';
import { UpdateSuggestionUseCase } from '../../../../application/domain/suggestion/usecase/update-suggestion.usecase';
import { DeleteSuggestionUseCase } from '../../../../application/domain/suggestion/usecase/delete-suggestion.usecase';
import { QueryMySuggestionsUseCase } from '../../../../application/domain/suggestion/usecase/query-my-suggestions.usecase';
import { Permission } from 'src/infrastructure/global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from 'src/infrastructure/global/decorator/current-user.decorator';
import { QueryMySuggestionsResponse } from 'src/application/domain/suggestion/dto/suggestion.dto';
import { User } from '../../../../application/domain/user/user';
import { SuggestionWebRequest } from './dto/suggestion.web.dto';

@Controller('suggestions')
export class SuggestionWebAdapter {
    constructor(
        private readonly createSuggestionUseCase: CreateSuggestionUseCase,
        private readonly updateSuggestionUseCase: UpdateSuggestionUseCase,
        private readonly deleteSuggestionUseCase: DeleteSuggestionUseCase,
        private readonly queryMySuggestionsUseCase: QueryMySuggestionsUseCase
    ) {}

    @Permission([Authority.USER])
    @Get('/my')
    async queryMySuggestions(@CurrentUser() user: User): Promise<QueryMySuggestionsResponse> {
        return await this.queryMySuggestionsUseCase.execute(user);
    }

    @Permission([Authority.USER])
    @HttpCode(201)
    @Post()
    async createSuggestion(@Body() request: SuggestionWebRequest, @CurrentUser() user: User) {
        await this.createSuggestionUseCase.execute(request, user);
    }

    @Permission([Authority.USER])
    @HttpCode(204)
    @Patch('/:suggestionId')
    async updateSuggestion(
        @Param('suggestionId') suggestionId: string,
        @Body() request: SuggestionWebRequest
    ) {
        await this.updateSuggestionUseCase.execute(suggestionId, request);
    }

    @HttpCode(204)
    @Permission([Authority.USER])
    @Delete(':suggestionId')
    async removeSuggestion(
        @Param('suggestionId') suggestionId: string,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.deleteSuggestionUseCase.execute(suggestionId, user.id);
    }
}
