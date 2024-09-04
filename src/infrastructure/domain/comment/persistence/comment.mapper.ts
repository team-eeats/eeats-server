import { Injectable } from '@nestjs/common';
import { CommentTypeormEntity } from './comment.entity';
import { Comment } from '../../../../application/domain/comment/comment';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { Repository } from 'typeorm';
import { SuggestionTypeormEntity } from '../../suggestion/persistence/suggestion.entity';
import { LocalDate, nativeJs } from 'js-joda';

@Injectable()
export class CommentMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>,
        @InjectRepository(SuggestionTypeormEntity)
        private readonly suggestionRepository: Repository<SuggestionTypeormEntity>
    ) {}

    toDomain(entity: CommentTypeormEntity): Comment {
        return new Comment(
            entity.content,
            entity.user.id,
            entity.suggestion.id,
            entity.id,
            LocalDate.from(nativeJs(entity.createdAt))
        );
    }

    async toEntity(domain: Comment): Promise<CommentTypeormEntity> {
        const user = await this.userRepository.findOneBy({ id: domain.userId });
        const suggestion = await this.suggestionRepository.findOneBy({ id: domain.suggestionId });

        return new CommentTypeormEntity(domain.content, user, suggestion, domain.id);
    }
}
