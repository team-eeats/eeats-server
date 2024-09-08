import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PollOptionTypeormEntity } from './poll-option.entity';

@Entity('tbl_poll')
export class PollTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'poll_id' })
    id: string;

    @OneToMany(() => PollOptionTypeormEntity, (pollOption) => pollOption.poll, {
        cascade: true
    })
    pollOptions: PollOptionTypeormEntity[];

    @Column({ nullable: false })
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
