import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VoteTypeormEntity } from '../../../vote/persistence/vote.entity';
import { PollTypeormEntity } from './poll.entity';

@Entity('tbl_poll_option')
export class PollOptionTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'poll_option_id' })
    id: string;

    @ManyToOne(() => PollTypeormEntity, (poll) => poll.pollOptions)
    poll: PollTypeormEntity;

    @Column('varchar', { nullable: false })
    description: string;

    @Column('varchar', { length: 255, default: null })
    imageUrl: string;

    @OneToMany(() => VoteTypeormEntity, (vote) => vote.pollOption)
    votes: VoteTypeormEntity[];

    constructor(poll: PollTypeormEntity, description: string, imageUrl?: string, id?: string) {
        this.id = id;
        this.poll = poll;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
