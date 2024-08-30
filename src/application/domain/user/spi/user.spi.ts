import { User } from "../user";

export interface UserPort {
  saveUser(user: User): Promise<User>;

  queryUserByNickname(nickname: string): Promise<User | null>;

  queryUserByAccountId(accountId: string): Promise<User | null>;
}

export const UserPort = Symbol('IUserPort');
