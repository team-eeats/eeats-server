import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_notice')
export class NoticeTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'notice_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.suggestions, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @Column('varchar', { nullable: false })
    title: string;

    @Column('varchar', { nullable: false })
    content: string;

    @CreateDateColumn()
    createdAt?: Date;

    constructor(user: UserTypeormEntity, title: string, content: string, id?: string) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.content = content;
    }
}
