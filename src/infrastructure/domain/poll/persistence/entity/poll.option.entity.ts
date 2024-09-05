import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { PollTypeormEntity } from './poll.entity';
import { VoteTypeormEntity } from '../../../../domain/vote/vote.entity';

@Entity('tbl_poll_option')
export class PollOptionTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'poll_option_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, (user) => user.pollOptions, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'user_id' })
    user: UserTypeormEntity;

    @ManyToOne(() => PollTypeormEntity, (poll) => poll.pollOptions, {
        cascade: true
    })
    poll: PollTypeormEntity;

    @Column('varchar', { nullable: false })
    description: string;

    @Column('varchar', { length: 255, default: null })
    imageUrl: string;

    @OneToMany(() => VoteTypeormEntity, (vote) => vote.option)
    votes: VoteTypeormEntity[];

    constructor(user: UserTypeormEntity, poll: PollTypeormEntity, description: string, imageUrl?: string, id?: string) {
        this.id = id;
        this.user = user;
        this.poll = poll;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
