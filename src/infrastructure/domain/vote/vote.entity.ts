import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PollTypeormEntity } from '../poll/persistence/entity/poll.entity';
import { PollOptionTypeormEntity } from '../poll/persistence/entity/poll.option.entity';
import { UserTypeormEntity } from '../user/persistence/user.entity';

@Entity('tbl_vote')
export class VoteTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'vote_id' })
    id: string;

    @ManyToOne(() => PollOptionTypeormEntity, (option) => option.votes, {
        onDelete: 'CASCADE'
    })
    option: PollOptionTypeormEntity;

    @ManyToOne(() => UserTypeormEntity, (user) => user.votes, {
        onDelete: 'CASCADE'
    })
    user: UserTypeormEntity;

    constructor(option: PollOptionTypeormEntity, user: UserTypeormEntity, id?: string) {
        this.id = id;
        this.option = option;
        this.user = user;
    }
}
