import { Body, Controller, Get, Headers, Post, Query, HttpCode } from '@nestjs/common';
import { LoginUseCase } from '../../../../application/domain/auth/usecase/login.usecase';
import { SignupUseCase } from '../../../../application/domain/auth/usecase/signup.usecase';
import {
    LoginRequest,
    TokenResponse,
    SignupRequest
} from '../../../../application/domain/auth/dto/auth.dto';

@Controller('auth')
export class AuthWebAdapter {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly signupUseCase: SignupUseCase
    ) {}

    @HttpCode(200)
    @Post('/login')
    async login(@Body() request: LoginRequest): Promise<TokenResponse> {
        const tokenResponse = await this.loginUseCase.execute(request);
        return tokenResponse;
    }

    @HttpCode(201)
    @Post('/signup')
    async signup(@Body() request: SignupRequest): Promise<TokenResponse> {
        const tokenResponse = await this.signupUseCase.execute(request);
        return tokenResponse;
    }
}
