import { Authority } from "./enum/Authority";

export class User {
  id?: string;
  password: string;
  nickname: string;
  profileUrl: string;
  authority: Authority;

  constructor(
    password: string,
    nickname: string,
    profileUrl,
    authority: Authority,
    id?: string
  ) {
    this.id = id;
    this.password = password;
    this.nickname = nickname;
    this.profileUrl = profileUrl;
    this.authority = authority;
  }

  updateProfileUrl(newProfileUrl: string) {
    this.profileUrl = newProfileUrl;
  }
}
