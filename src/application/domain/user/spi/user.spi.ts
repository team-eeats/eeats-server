import { User } from '../user';

export interface UserPort {
    queryUserByAccountId(accountId: string): Promise<User | null>;

    saveUser(user: User): Promise<User>;
}

export const UserPort = Symbol('IUserPort');
