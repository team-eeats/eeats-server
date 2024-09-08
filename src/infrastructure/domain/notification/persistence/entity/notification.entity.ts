import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { UserTypeormEntity } from '../../../../domain/user/persistence/user.entity';
import { Topic } from '../../../../../application/domain/notification/model/notification';

@Entity('tbl_notification')
export class NotificationTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'device_token_id' })
    id: string;

    @ManyToOne(() => UserTypeormEntity, { nullable: false })
    user: UserTypeormEntity;

    @Column('varchar', { nullable: false })
    topic: Topic;

    @Column('varchar', { length: 500, nullable: false })
    title: string;

    @Column('varchar', { length: 500, nullable: false })
    content: string;

    @Column('varchar', { length: 500, nullable: true })
    linkIdentifier: string | null;

    @CreateDateColumn()
    createdAt: Date;

    @Column('boolean', { default: false })
    isRead: boolean;
}
