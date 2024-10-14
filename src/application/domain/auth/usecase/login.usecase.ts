import { Injectable, UnauthorizedException, NotFoundException, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UserPort } from '../../user/spi/user.spi';
import * as bcrypt from 'bcrypt';
import { User } from '../../user/user';
import { Authority } from '../../user/authority';
import { LoginRequest, TokenResponse, XquareUserResponse } from '../dto/auth.dto';
import { JwtPort } from '../spi/auth.spi';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(UserPort)
        private readonly userPort: UserPort,
        @Inject(JwtPort)
        private readonly jwtPort: JwtPort,
        @Inject(HttpService)
        private readonly httpService: HttpService
    ) {}

    async execute(req: LoginRequest): Promise<TokenResponse> {
        const accountId = req.account_id.trim();
        const studentExists = await this.userPort.checkUserByAccountId(accountId);

        return studentExists
            ? this.loginExistingStudent(req)
            : this.registerAndLoginNewStudent(req);
    }

    private async loginExistingStudent(req: LoginRequest): Promise<TokenResponse> {
        const student = await this.userPort.queryUserByAccountId(req.account_id);
        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const validatePassword = await bcrypt.compare(req.password, student.password);
        if (!validatePassword) {
            throw new UnauthorizedException('Password mismatch');
        }

        return this.getTokenResponse(student.id);
    }

    private async registerAndLoginNewStudent(req: LoginRequest): Promise<TokenResponse> {
        let xquareUserResponse: XquareUserResponse;
        const url = 'https://prod-server.xquare.app/dsm-login/user/user-data';

        try {
            const response = await firstValueFrom(
                this.httpService.post(url, req).pipe(
                    catchError((error: AxiosError) => {
                        console.log('error', error);
                        throw 'An error happened!';
                    })
                )
            );

            xquareUserResponse = response.data as XquareUserResponse;
        } catch (e) {
            throw new UnauthorizedException();
        }

        if (xquareUserResponse.user_role !== 'STU') {
            throw new Error(`Invalid User`);
        }

        const newStudent = await this.createAndSaveNewStudent(xquareUserResponse);

        return this.getTokenResponse(newStudent.id);
    }

    private getTokenResponse(studentId: string): Promise<TokenResponse> {
        return this.jwtPort.generateToken(studentId);
    }

    private async createAndSaveNewStudent(xquareUserResponse: XquareUserResponse): Promise<User> {
        const newStudent = new User(
            xquareUserResponse.account_id,
            xquareUserResponse.password,
            xquareUserResponse.name,
            xquareUserResponse.profileImg_url,
            Authority.USER
        );

        return this.userPort.saveUser(newStudent);
    }
}
