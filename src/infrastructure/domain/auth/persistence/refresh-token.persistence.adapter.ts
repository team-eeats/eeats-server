import { Injectable } from '@nestjs/common';
import { RefreshTokenPort } from '../../../../application/domain/auth/spi/auth.spi';
import { RefreshTokenRepository } from './repository/refresh-token.repository';

@Injectable()
export class RefreshTokenPersistenceAdapter implements RefreshTokenPort {
    constructor(
        private readonly refreshTokenRepository: RefreshTokenRepository
    ) {}

    async queryRefreshTokenByUserId(userId: string): Promise<string> {
        return await this.refreshTokenRepository.get(userId);
    }
}
