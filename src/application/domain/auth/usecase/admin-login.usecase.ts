import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPort } from '../../../../application/domain/auth/spi/auth.spi';
import { LoginRequest, TokenResponse } from '../../../../application/domain/auth/dto/auth.dto';
import { UserPort } from '../../../../application/domain/user/spi/user.spi';
import * as bcrypt from 'bcrypt';
import { Authority } from '../../../../application/domain/user/authority';

@Injectable()
export class AdminLoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort
    ) {}

    async execute(req: LoginRequest): Promise<TokenResponse> {
        const admin = await this.userPort.queryUserByAuthority(Authority.MANAGER);

        if (req.account_id != admin.accountId)
            throw new UnauthorizedException('Account id mismatch');

        const validatePassword = await bcrypt.compare(req.password, admin.password);
        if (!validatePassword) {
            throw new UnauthorizedException('Password mismatch');
        }

        return this.getTokenResponse(admin.id);
    }

    private getTokenResponse(studentId: string): Promise<TokenResponse> {
        return this.jwtPort.generateToken(studentId);
    }
}
