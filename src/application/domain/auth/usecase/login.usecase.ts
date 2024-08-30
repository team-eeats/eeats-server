import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserPort } from '../../user/spi/user.spi';
import { User } from '../../user/user';
import { JwtPort } from '../spi/auth.spi';
import { TokenResponse, LoginRequest } from '../dto/auth.dto';
import { Authority } from '../../user/enum/authority';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort
    ) {}

    async execute(req: LoginRequest): Promise<TokenResponse> {
        const user = await this.userPort.queryUserByAccountId(req.accountId);
        if (!user) throw new NotFoundException('User Not Found');

        const isMatch = await bcrypt.compare(req.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Invalid Password');

        return this.jwtPort.generateToken(user.id);
    }
}
