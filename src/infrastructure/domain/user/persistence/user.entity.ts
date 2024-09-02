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
    authority: string;

    constructor(accountId: string, password: string, nickname: string, profileUrl: string, authority: string, id?: string) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }
}

export const Authority = {
    USER: 'USER',
    MANAGER: 'MANAGER'
};
