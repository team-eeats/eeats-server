import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PollOptionTypeormEntity } from '../../poll/persistence/entity/poll-option.entity';
import { UserTypeormEntity } from '../../user/persistence/user.entity';

@Entity('tbl_vote')
export class VoteTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'vote_id' })
    id: string;

    @ManyToOne(() => PollOptionTypeormEntity, (option) => option.votes, {
        onDelete: 'CASCADE'
    })
    pollOption: PollOptionTypeormEntity;

    @ManyToOne(() => UserTypeormEntity, (user) => user.votes, {
        onDelete: 'CASCADE'
    })
    user: UserTypeormEntity;

    constructor(pollOption: PollOptionTypeormEntity, user: UserTypeormEntity, id?: string) {
        this.id = id;
        this.pollOption = pollOption;
        this.user = user;
    }
}
