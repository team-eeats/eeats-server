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

    @Column({ type: 'timestamp', nullable: false })
    startDate: Date;

    @Column({ type: 'timestamp', nullable: false })
    endDate: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @Column({ type: 'boolean', default: false })
    isHidden: boolean;

    constructor(title: string, description: string, startDate: Date, endDate: Date, isHidden: boolean, id?: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isHidden = isHidden;
    }
}
