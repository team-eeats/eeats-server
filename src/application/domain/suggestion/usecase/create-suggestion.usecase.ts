import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';
import { User } from '../../user/user';
import { Suggestion } from '../suggestion';
import { SuggestionWebRequest } from '../../../../infrastructure/domain/suggestion/presentation/dto/suggestion.web.dto';

@Injectable()
export class CreateSuggestionUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(request: SuggestionWebRequest, user: User) {
        await this.suggestionPort.saveSuggestion(
            new Suggestion(user.id, request.title, request.content)
        );
    }
}
