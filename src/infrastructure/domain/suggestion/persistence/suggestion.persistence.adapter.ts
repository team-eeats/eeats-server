import { Injectable } from '@nestjs/common';
import { SuggestionPort } from '../../../../application/domain/suggestion/spi/suggestion.spi';
import { Suggestion } from '../../../../application/domain/suggestion/suggestion';
import { InjectRepository } from '@nestjs/typeorm';
import { SuggestionTypeormEntity } from './suggestion.entity';
import { Repository } from 'typeorm';
import { SuggestionMapper } from './suggestion.mapper';
import { SuggestionResponse } from 'src/application/domain/suggestion/dto/suggestion.dto';

@Injectable()
export class SuggestionPersistenceAdapter implements SuggestionPort {
    constructor(
        @InjectRepository(SuggestionTypeormEntity)
        private readonly suggestionRepository: Repository<SuggestionTypeormEntity>,
        private readonly suggestionMapper: SuggestionMapper
    ) {}

    async saveSuggestion(suggestion: Suggestion): Promise<Suggestion> {
        const entity = await this.suggestionMapper.toEntity(suggestion);

        return this.suggestionMapper.toDomain(await this.suggestionRepository.save(entity));
    }

    async querySuggestionByUserId(userId: string): Promise<Suggestion[]> {
        const suggestions = await this.suggestionRepository.find({
            where: {
                user: { id: userId }
            },
            relations: {
                user: true
            }
        });

        return Promise.all(
            suggestions.map(async (suggestion) => await this.suggestionMapper.toDomain(suggestion))
        );
    }

    async querySuggestionById(suggestionId: string): Promise<Suggestion> {
        return await this.suggestionMapper.toDomain(
            await this.suggestionRepository.findOne({
                where: {
                    id: suggestionId
                },
                relations: {
                    user: true
                }
            })
        );
    }

    async deleteSuggestion(suggestion: Suggestion): Promise<void> {
        await this.suggestionRepository.remove(await this.suggestionMapper.toEntity(suggestion));
    }

    async queryAllSuggestions(): Promise<SuggestionResponse[]> {
        const suggestions = await this.suggestionRepository.find({
            relations: {
                user: true
            }
        });

        return Promise.all(
            suggestions.map(async (suggestion) => await this.suggestionMapper.toDomain(suggestion))
        );
    }

    async existsSuggestionById(suggestionId: string): Promise<boolean> {
        return await this.suggestionRepository.exists({
            where: { id: suggestionId }
        });
    }
}
