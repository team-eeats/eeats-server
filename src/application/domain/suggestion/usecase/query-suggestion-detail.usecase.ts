import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SuggestionPort } from '../spi/suggestion.spi';
import { SuggestionDetailResponse } from '../dto/suggestion.dto';

@Injectable()
export class QuerySuggestionDetailUseCase {
    constructor(
        @Inject(SuggestionPort)
        private readonly suggestionPort: SuggestionPort
    ) {}

    async execute(suggestionId: string): Promise<SuggestionDetailResponse> {
        const suggestion = await this.suggestionPort.querySuggestionById(suggestionId);
        if (!suggestion) {
            throw new NotFoundException('Suggestion Not Found');
        }

        return {
            id: suggestion.id,
            title: suggestion.title,
            content: suggestion.content
        };
    }
}
