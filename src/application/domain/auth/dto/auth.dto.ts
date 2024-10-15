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
    grade: number;
    class_num: number;
    num: number;
    user_role: string;
    profileImg_url: string;
    clubName: string;
}

export class SignupRequest {
    accountId: string;
    password: string;
    nickname?: string;
    profileUrl?: string;
}
