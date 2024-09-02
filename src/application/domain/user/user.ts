export class User {
    id?: string;
    accountId: string;
    password: string;
    nickname: string;
    profileUrl: string;
    authority: string;

    constructor(
        accountId: string,
        password: string,
        nickname: string,
        profileUrl: string,
        authority: string,
        id?: string
    ) {
        this.id = id;
        this.accountId = accountId;
        this.password = password;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.authority = authority;
    }

    updateProfileUrl(newProfileUrl: string) {
        this.profileUrl = newProfileUrl;
    }
}
