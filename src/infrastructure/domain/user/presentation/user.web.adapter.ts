import { Body, Controller, Get, HttpCode, Patch } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../../../application/domain/user/authority';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { UpdateProfileUseCase } from '../../../../application/domain/user/usecase/update-profile.usecase';
import { QueryMyInfoResponse, UpdateProfileRequest } from './dto/user.web.dto';
import { QueryAllergyUseCase } from '../../../../application/domain/allergy/usecase/query-allergy.usecase';
import { ToggleAllergyUseCase } from '../../../../application/domain/allergy/usecase/toggle-allergy.usecase';
import { AllergyType } from '../../../../application/domain/allergy/allergy.type';

@Controller('users')
export class UserWebAdapter {
    constructor(
        private readonly updateProfileUseCase: UpdateProfileUseCase,
        private readonly queryAllergyUseCase: QueryAllergyUseCase,
        private readonly toggleAllergyUseCase: ToggleAllergyUseCase
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

    @Permission([Authority.USER])
    @Get('/allergy')
    async queryAllergy(@CurrentUser() user: User) {
        const allergies = await this.queryAllergyUseCase.execute(user.id);
        return {
            allergies: allergies.map((allergy) => ({
                id: allergy.id,
                type: AllergyType[allergy.type]
            }))
        };
    }

    @Permission([Authority.USER, Authority.MANAGER])
    @Patch('/allergy')
    async toggleAllergy(@CurrentUser() user: User, @Body('type') type: AllergyType[]) {
        await this.toggleAllergyUseCase.execute(user.id, type);
    }
}
