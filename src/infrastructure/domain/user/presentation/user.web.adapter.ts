import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../../../application/domain/user/authority';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { UpdateProfileUseCase } from '../../../../application/domain/user/usecase/update-profile.usecase';
import { QueryMyInfoResponse, UpdateProfileRequest } from './dto/user.web.dto';
import { AllergyType } from '../../../../application/domain/allergy/allergy.type';
import { QueryAllergyUseCase } from '../../../../application/domain/allergy/usecase/query-allergy.usecase';

@Controller('users')
export class UserWebAdapter {
    constructor(
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly queryAllergyUseCase: QueryAllergyUseCase
    ) {}

    @HttpCode(204)
    @Permission([Authority.USER, Authority.MANAGER])
    @Patch('/profile')
    async updateProfile(@CurrentUser() user: User, @Body() request: UpdateProfileRequest) {
        await this.updateProfileUseCase.execute(user, request.nickname);
    }

    @Permission([Authority.USER, Authority.MANAGER])
    @Get('/my')
    async queryMyInfo(@CurrentUser() user: User): Promise<QueryMyInfoResponse> {
        const allergies = await this.queryAllergyUseCase.execute(user.id);

        return {
            accountId: user.accountId,
            nickname: user.nickname,
            allergies: [
                {
                    type: allergies.map((allergy) => AllergyType[allergy.type])
                }
            ]
        };
    }
}
