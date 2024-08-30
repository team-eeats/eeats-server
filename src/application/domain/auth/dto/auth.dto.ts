export class TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export class LoginRequest {
    accountId: string;
    password: string;
    nickname?: string;
}

export class SignupRequest {
    accountId: string;
    password: string;
    nickname: string;
}