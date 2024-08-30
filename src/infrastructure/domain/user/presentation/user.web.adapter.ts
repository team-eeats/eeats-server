import { Body, Controller, Delete, Get, HttpCode, Patch } from '@nestjs/common';
import { Authority } from '../../../../application/domain/user/enum/authority';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { Permission } from '../../../global/decorator/authority.decorator';
import { User } from '../../../../application/domain/user/user';
import { UpdateProfileUseCase } from '../../../../application/domain/user/usecase/update-profile.usecase';
import { UpdateProfileRequest } from './dto/user.web.dto';

@Controller('users')
export class UserWebAdapter {
    constructor(
        private readonly udpateProfileUseCase: UpdateProfileUseCase
    ) {}

    @HttpCode(204)
    @Patch('/profile')
    async updateProfile(@CurrentUser() user: User, @Body() request: UpdateProfileRequest) {
        await this.udpateProfileUseCase.execute(user, request.profileImageUrl);
    }
}
