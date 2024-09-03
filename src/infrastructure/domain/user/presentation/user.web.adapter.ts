import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { UpdateProfileUseCase } from '../../../../application/domain/user/usecase/update-profile.usecase';
import { QueryMyInfoResponse, UpdateProfileRequest } from './dto/user.web.dto';

@Controller('users')
export class UserWebAdapter {
    constructor(private readonly updateProfileUseCase: UpdateProfileUseCase) {}

    @HttpCode(204)
    @Permission([Authority.USER, Authority.MANAGER])
    @Patch('/profile')
    async updateProfile(@CurrentUser() user: User, @Body() request: UpdateProfileRequest) {
        await this.updateProfileUseCase.execute(user, request.nickname);
    }

    @Permission([Authority.USER, Authority.MANAGER])
    @Get('/my')
    queryMyInfo(@CurrentUser() user: User): QueryMyInfoResponse {
        return {
            accountId: user.accountId,
            nickname: user.nickname
        };
    }
}
