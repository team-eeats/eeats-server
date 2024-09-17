import { Allergy } from '../allergy/allergy';

export class User {
    id?: string;
    accountId: string;
    password: string;
    nickname: string;
    authority: string;
    allergies: Allergy[];

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

    updateProfile(newNickname: string) {
        this.nickname = newNickname;
    }
}
