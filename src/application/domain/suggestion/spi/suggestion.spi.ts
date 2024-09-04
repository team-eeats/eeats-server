import { QueryAllSuggestionsResponse, SuggestionResponse } from '../dto/suggestion.dto';
import { Suggestion } from '../suggestion';

export interface SuggestionPort {
    saveSuggestion(suggestion: Suggestion): Promise<Suggestion>;

    querySuggestionByUserId(userId: string): Promise<Suggestion[]>;

    querySuggestionById(id: string): Promise<Suggestion>;

    deleteSuggestion(suggestion: Suggestion): Promise<void>;

    queryAllSuggestions(): Promise<SuggestionResponse[]>;

    existsSuggestionById(suggestionId: string): Promise<boolean>;
}

export const SuggestionPort = Symbol('ISuggestionPort');
