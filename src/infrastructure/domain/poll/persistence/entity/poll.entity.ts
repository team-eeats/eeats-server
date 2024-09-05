import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { PollOptionTypeormEntity } from './poll.option.entity';
import { VoteTypeormEntity } from '../../../../domain/vote/vote.entity';

@Entity('tbl_poll')
export class PollTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'poll_id' })
    id: string;

    @OneToMany(() => PollOptionTypeormEntity, (pollOption) => pollOption.poll, {
        cascade: true
    })
    pollOptions: PollOptionTypeormEntity[];

    @Column( { nullable: false })
    title: string;

    @Column({ nullable: true })
    description?: string;

    @CreateDateColumn()
    createdAt?: Date;

    constructor(title: string, description: string, id?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
