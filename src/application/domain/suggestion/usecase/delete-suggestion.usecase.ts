import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';

@Injectable()
export class DeleteSuggestionUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(suggestionId: string, currentUserId: string) {
        const suggestion = await this.suggestionPort.querySuggestionById(suggestionId);
        if (!suggestion) {
            throw new NotFoundException('Suggestion Not Found');
        }

        if (suggestion.userId !== currentUserId) {
            throw new ForbiddenException('Invalid User');
        }

        await this.suggestionPort.deleteSuggestion(suggestion);
    }
}
