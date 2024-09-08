import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserTypeormEntity } from '../user/persistence/user.entity';

@Entity('tbl_device_token')
export class DeviceTokenTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'device_token_id' })
    id: string;

    @Column('varchar', { unique: true })
    token: string;

    @ManyToOne(() => UserTypeormEntity, { nullable: false })
    user: UserTypeormEntity;

    constructor(token: string, user: UserTypeormEntity, id?: string) {
        this.id = id;
        this.token = token;
        this.user = user;
    }
}
