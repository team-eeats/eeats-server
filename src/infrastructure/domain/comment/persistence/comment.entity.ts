import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';
import { SuggestionTypeormEntity } from '../../suggestion/persistence/suggestion.entity';

@Entity('tbl_comment')
export class CommentTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
    id?: string;

    @Column('varchar', { length: 30 })
    content: string;

    @ManyToOne(() => UserTypeormEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @ManyToOne(() => SuggestionTypeormEntity)
    @JoinColumn({ name: 'suggestion_id' })
    suggestion: SuggestionTypeormEntity;

    @CreateDateColumn()
    createdAt?: Date;

    constructor(
        content: string,
        user: UserTypeormEntity,
        suggestion: SuggestionTypeormEntity,
        id?: string
    ) {
        this.id = id;
        this.content = content;
        this.user = user;
        this.suggestion = suggestion;
    }
}
