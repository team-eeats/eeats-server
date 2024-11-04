export class TokenResponse {
    accessToken: string;
    refreshToken: string;
}

export class LoginRequest {
    account_id: string;
    password: string;
}

export class XquareUserResponse {
    id: string;
    account_id: string;
    password: string;
    name: string;
    user_role: string;
}
