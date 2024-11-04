import { User } from '../user';

export interface UserPort {
    queryUserByAccountId(accountId: string): Promise<User | null>;

    saveUser(user: User): Promise<User>;

    queryUsersWithAllergies(): Promise<User[]>;

    checkUserByAccountId(accountId: string): Promise<Boolean>;

    queryUserByAuthority(authority: string): Promise<User | null>;
}

export const UserPort = Symbol('IUserPort');
