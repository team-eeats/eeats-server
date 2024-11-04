import { Body, Controller, Post, HttpCode, Put, Headers } from '@nestjs/common';
import { AdminLoginUseCase } from '../../../../application/domain/auth/usecase/admin-login.usecase';
import { UserLoginUseCase } from '../../../../application/domain/auth/usecase/user-login.usecase';
import { TokenReissueUseCase } from '../../../../application/domain/auth/usecase/token-reissue.usecase';
import {
    LoginRequest,
    TokenResponse
} from '../../../../application/domain/auth/dto/auth.dto';

@Controller('auth')
export class AuthWebAdapter {
    constructor(
        private readonly userLoginUseCase: UserLoginUseCase,
        private readonly adminLoginUseCase: AdminLoginUseCase,
        private readonly tokenReissueUseCase: TokenReissueUseCase
    ) {}

    @HttpCode(200)
    @Post('/user-login')
    async userLogin(@Body() request: LoginRequest): Promise<TokenResponse> {
        return await this.userLoginUseCase.execute(request);
    }

    @HttpCode(200)
    @Post('/admin-login')
    async adminLogin(@Body() request: LoginRequest): Promise<TokenResponse> {
        return await this.adminLoginUseCase.execute(request);
    }

    @Put('/reissue')
    async reissueToken(@Headers('Refresh-Token') refreshToken: string) {
        return await this.tokenReissueUseCase.execute(refreshToken);
    }
}
