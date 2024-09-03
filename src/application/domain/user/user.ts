export class User {
    id?: string;
    accountId: string;
    password: string;
    nickname: string;
    authority: string;

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
