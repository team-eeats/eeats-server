import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { PollOptionTypeormEntity } from './poll.option.entity';
import { VoteTypeormEntity } from '../../../../domain/vote/vote.entity';

@Entity('tbl_poll')
export class PollTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'poll_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.polls, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @OneToMany(() => PollOptionTypeormEntity, (pollOption) => pollOption.poll, {
        cascade: true
    })
    pollOptions: PollOptionTypeormEntity[];

    @OneToMany(() => VoteTypeormEntity, (vote) => vote.poll, {
        cascade: true
    })
    votes: VoteTypeormEntity[];

    @Column( { nullable: false })
    title: string;

    @Column({ nullable: true})
    description?: string;

    @CreateDateColumn()
    createdAt?: Date;

    constructor(user: UserTypeormEntity, title: string, description: string, id?: string) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.description = description;
    }
}
