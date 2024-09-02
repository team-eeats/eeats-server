import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenRepository } from '../../domain/auth/persistence/refresh-token.repository';

@Module({
    imports: [
        CacheModule.registerAsync<RedisClientOptions>({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                store: await redisStore({
                    socket: {
                        host: config.get<string>('REDIS_HOST'),
                        port: config.get<number>('REDIS_PORT')
                    },
                    password: config.get<string>('REDIS_PASSWORD')
                })
            })
        })
    ],
    providers: [RefreshTokenRepository],
    exports: [RefreshTokenRepository]
})
export class RedisCacheModule {}
