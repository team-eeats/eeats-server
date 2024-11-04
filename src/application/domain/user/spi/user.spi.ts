import { User } from '../user';
import { Authority } from '../../../../application/domain/user/authority';

export interface UserPort {
    queryUserByAccountId(accountId: string): Promise<User | null>;

    saveUser(user: User): Promise<User>;

    queryUsersWithAllergies(): Promise<User[]>;

    checkUserByAccountId(accountId: string): Promise<Boolean>;

    queryUserByAuthority(authority: Authority): Promise<User | null>;
}

export const UserPort = Symbol('IUserPort');
