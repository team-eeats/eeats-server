import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { RefreshTokenRedisEntity } from './refresh-token.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenRepository {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
        private readonly configService: ConfigService
    ) {}

    async get(key: string): Promise<string> {
        return await this.cacheManager.get(key);
    }

    async save(refreshToken: RefreshTokenRedisEntity) {
        await this.cacheManager.set(
            refreshToken.userId,
            refreshToken.token,
            this.configService.get<number>('REFRESH_EXP')
        );
    }
}
