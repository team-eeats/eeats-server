import { Authority } from '../../../../application/domain/user/enum/authority';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tbl_user')
export class UserTypeormEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
    id: string;

    @Column('varchar', { unique: true, nullable: false, length: 50 })
    accountId: string;

    @Column('varchar')
    password: string;

    @Column('varchar')
    nickname: string;

    @Column('varchar', { nullable: true })
    profileUrl: string;

    @Column('varchar', { length: 7 })
    authority: Authority

    constructor(accountId: string, password: string, nickname: string, profileUrl: string, authority: Authority, id?: string) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }
}
