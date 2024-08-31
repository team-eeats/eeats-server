import { JwtPort } from '../../../../application/domain/auth/spi/auth.spi';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from '../../../../application/domain/auth/dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { RefreshTokenRepository } from '../../../domain/auth/persistence/refresh-token.repository';

@Injectable()
export class JwtAdapter implements JwtPort {
    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository
    ) {}

    async generateToken(userId: string): Promise<TokenResponse> {
        const accessToken = await this.signJwtToken(userId, '1h', 'access');
        const refreshToken = await this.signJwtToken(userId, '14d', 'refresh');

        await this.refreshTokenRepository.save({
            userId,
            token: refreshToken
        });

        return {
            accessToken,
            refreshToken
        };
    }

    async getSubject(token: string): Promise<string> {
        const parsed = await this.jwtService.verifyAsync(token);

        return parsed.sub;
    }

    private async signJwtToken(userId: string, exp: string, typ: string) {
        return await this.jwtService.signAsync(
            { sub: userId, typ },
            { expiresIn: exp }
        );
    }
}