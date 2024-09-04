import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TokenResponse } from '../dto/auth.dto';
import { JwtPort, RefreshTokenPort } from '../spi/auth.spi';

@Injectable()
export class TokenReissueUseCase {
    constructor(
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        @Inject(RefreshTokenPort)
        private readonly refreshTokenPort: RefreshTokenPort
    ) {}

    async execute(token: string): Promise<TokenResponse> {
        const userId = await this.jwtPort.getSubject(token);
        const refreshToken = await this.refreshTokenPort.queryRefreshTokenByUserId(userId);
        if (token != refreshToken) {
            throw new NotFoundException('Refresh Token Not Found');
        }

        return await this.jwtPort.generateToken(userId);
    }
}
