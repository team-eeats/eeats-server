import { Injectable } from "@nestjs/common";
import { UserTypeormEntity } from "./user.entity";
import { User } from "../../../../application/domain/user/user";

@Injectable()
export class UserMapper {
  toDomain(entity: UserTypeormEntity): User | null {
    return entity
      ? new User(
          entity.accountId,
          entity.password,
          entity.nickname,
          entity.profileUrl,
          entity.authority,
          entity.id
        )
      : null;
  }

  toEntity(domain: User): UserTypeormEntity {
    return new UserTypeormEntity(
      domain.accountId,
      domain.password,
      domain.nickname,
      domain.profileUrl,
      domain.authority,
      domain.id
    );
  }
}
