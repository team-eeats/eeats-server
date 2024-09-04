import { Global, Module } from '@nestjs/common';
import { AuthWebAdapter } from '../../domain/auth/presentation/auth.web.adapter';
import { LoginUseCase } from '../../../application/domain/auth/usecase/login.usecase';
import { SignupUseCase } from '../../../application/domain/auth/usecase/signup.usecase';
import { RedisCacheModule } from '../config/redis.config';
import { JwtModule } from '@nestjs/jwt';
import { JwtPort, RefreshTokenPort } from '../../../application/domain/auth/spi/auth.spi';
import { JwtAdapter } from '../security/jwt/jwt.adapter';
import { ConfigService } from '@nestjs/config';
import { TokenReissueUseCase } from '../../../application/domain/auth/usecase/token-reissue.usecase';
import { RefreshTokenPersistenceAdapter } from '../../domain/auth/persistence/refresh-token.persistence.adapter';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../guard/jwt.guard';

const JWT_PORT = { provide: JwtPort, useClass: JwtAdapter };
const REFRESH_TOKEN_PORT = { provide: RefreshTokenPort, useClass: RefreshTokenPersistenceAdapter };
const GLOBAL_GUARD = { provide: APP_GUARD, useClass: JwtAuthGuard };

@Global()
@Module({
    imports: [RedisCacheModule, JwtModule.registerAsync({
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            secret: config.get<string>('JWT_SECRET')
        })
    })],
    controllers: [AuthWebAdapter],
    providers: [
        LoginUseCase,
        TokenReissueUseCase,
        SignupUseCase,
        JWT_PORT,
        REFRESH_TOKEN_PORT,
        GLOBAL_GUARD
    ]
})
export class AuthModule {}
