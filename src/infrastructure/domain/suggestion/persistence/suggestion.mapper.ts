import { Suggestion } from '../../../../application/domain/suggestion/suggestion';
import { SuggestionTypeormEntity } from './suggestion.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { convert, LocalDate, nativeJs } from 'js-joda';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Injectable()
export class SuggestionMapper {
    constructor(
        @InjectRepository(UserTypeormEntity)
        private readonly userRepository: Repository<UserTypeormEntity>
    ) {}

    async toDomain(entity: SuggestionTypeormEntity): Promise<Suggestion> {
        return entity
            ? new Suggestion(
                  entity.user.id,
                  entity.title,
                  entity.content,
                  entity.createdAt ? LocalDate.from(nativeJs(entity.createdAt)) : null,
                  entity.id
              )
            : null;
    }

    async toEntity(domain: Suggestion): Promise<SuggestionTypeormEntity> {
        let user = await this.userRepository.findOneBy({ id: domain.userId });
        return new SuggestionTypeormEntity(user, domain.title, domain.content, domain.id);
    }
}
