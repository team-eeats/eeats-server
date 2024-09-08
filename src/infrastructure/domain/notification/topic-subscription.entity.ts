import { Entity, Column, ManyToOne, PrimaryColumn, Index } from 'typeorm';
import { Topic } from '../../../application/domain/notification/model/notification';
import { DeviceTokenTypeormEntity } from './device-token.entity';

@Entity('tbl_topic_subscription')
@Index('topic_subscription_id', ['deviceTokenId', 'topic'], { unique: true })
export class TopicSubscriptionTypeormEntity {
    @PrimaryColumn('uuid', { name: 'device_token_id' })
    deviceTokenId: string;

    @ManyToOne(() => DeviceTokenTypeormEntity, { nullable: false })
    deviceToken: DeviceTokenTypeormEntity;

    @PrimaryColumn('varchar', { length: 20, name: 'topic' })
    topic: Topic;

    @Column('boolean', { default: true })
    isSubscribed: boolean;
}
