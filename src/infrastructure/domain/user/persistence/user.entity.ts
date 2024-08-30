import { Authority } from "src/application/domain/user/enum/authority";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_user")
export class UserTypeormEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  id: string;

  @Column("char", { nullable: false, length: 15 })
  password: string;

  @Column("varchar", { nullable: false, length: 10 })
  nickname: string;

  @Column("varchar")
  profileUrl: string;

  @Column("varchar", { length: 7 })
  authority: Authority;

  constructor(
    password: string,
    nickname: string,
    profileUrl: string,
    authority: Authority,
    id?: string
  ) {
    this.id = id;
    this.password = password;
    this.nickname = nickname;
    this.profileUrl = profileUrl;
    this.authority = authority;
  }
}
