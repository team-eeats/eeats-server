import { Inject, Injectable } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';
import { SuggestionRequest } from '../dto/suggestion.dto';

@Injectable()
export class UpdateSuggestionUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(suggestionId: string, request: SuggestionRequest): Promise<void> {
        const suggestion = await this.suggestionPort.querySuggestionById(suggestionId);

        suggestion.update(request.title, request.content);
        await this.suggestionPort.saveSuggestion(suggestion);
    }
}
