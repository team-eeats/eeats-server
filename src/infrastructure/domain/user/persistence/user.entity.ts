import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SuggestionTypeormEntity } from '../../suggestion/persistence/suggestion.entity';
import { NoticeTypeormEntity } from '../../notice/persistence/notice.entity';

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

    @Column('varchar', { length: 7 })
    authority: string;

    @OneToMany(() => SuggestionTypeormEntity, (suggestion) => suggestion.user, {
        cascade: true
    })
    suggestions: SuggestionTypeormEntity[];

    @OneToMany(() => NoticeTypeormEntity, (notice) => notice.user, {
        cascade: true
    })
    notices: NoticeTypeormEntity[];

    constructor(
        accountId: string,
        password: string,
        nickname: string,
        authority: string,
        id?: string
    ) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.nickname = nickname;
        this.authority = authority;
    }
}

export const Authority = {
    USER: 'USER',
    MANAGER: 'MANAGER'
};
