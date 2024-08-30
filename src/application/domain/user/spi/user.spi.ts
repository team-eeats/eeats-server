import { User } from "../user";

export interface UserPort {
  saveUser(user: User): Promise<User>;
}

export const UserPort = Symbol('IUserPort');
