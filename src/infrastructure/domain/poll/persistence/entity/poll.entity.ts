import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PollOptionTypeormEntity } from './poll-option.entity';
import { LocalDateTime } from 'js-joda';

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

    @Column({ type: 'timestamp', nullable: false })
    startDate: LocalDateTime;

    @Column({ type: 'timestamp', nullable: false })
    endDate: LocalDateTime;

    @CreateDateColumn()
    createdAt?: Date;

    constructor(title: string, description: string, startDate: LocalDateTime, endDate: LocalDateTime, id?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
