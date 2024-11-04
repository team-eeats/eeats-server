import { Injectable } from '@nestjs/common';
import { CommentPort } from '../../../../application/domain/comment/spi/comment.spi';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentTypeormEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { CommentResponse } from '../../../../application/domain/comment/dto/comment.dto';
import { Comment } from '../../../../application/domain/comment/comment';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class CommentPersistenceAdapter implements CommentPort {
    constructor(
        @InjectRepository(CommentTypeormEntity)
        private readonly commentRepository: Repository<CommentTypeormEntity>,
        private readonly commentMapper: CommentMapper
    ) {}

    async querySuggestionComment(suggestionId: string): Promise<CommentResponse | null> {
        const comment = await this.commentRepository
            .createQueryBuilder('c')
            .innerJoin('tbl_user', 'u', 'u.user_id = c.user_id')
            .select(['c.comment_id as id', 'c.content as content'])
            .where('c.suggestion_id = :suggestionId', { suggestionId })
            .getRawOne();

        return comment ? {
            id: comment.id,
            content: comment.content
        } : null;
    }

    async saveComment(comment: Comment): Promise<Comment> {
        return this.commentMapper.toDomain(
            await this.commentRepository.save(await this.commentMapper.toEntity(comment))
        );
    }

    async deleteComment(comment: Comment): Promise<void> {
        await this.commentRepository.remove(await this.commentMapper.toEntity(comment));
    }

    async queryCommentById(commentId: string): Promise<Comment> {
        return this.commentMapper.toDomain(
            await this.commentRepository.findOne({
                where: {
                    id: commentId
                },
                relations: {
                    user: true,
                    suggestion: true
                },
                order: {
                    createdAt: 'desc'
                }
            })
        );
    }
}
