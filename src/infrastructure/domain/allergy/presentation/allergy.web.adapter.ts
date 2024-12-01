import { Body, Controller, Get, HttpCode, Patch, Query } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../../../application/domain/user/authority';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { GetAllergyWarningsUseCase } from '../../../../application/domain/allergy/usecase/get-allergy-warning.usecase';
import { QueryAllergyUseCase } from '../../../../application/domain/allergy/usecase/query-allergy.usecase';
import { ToggleAllergyUseCase } from '../../../../application/domain/allergy/usecase/toggle-allergy.usecase';
import { AllergyType } from '../../../../application/domain/allergy/allergy.type';

@Controller('allergy')
export class AllergyWebAdapter {
    constructor(
        private readonly getAllergyWarningsUseCase: GetAllergyWarningsUseCase,
        private readonly queryAllergyUseCase: QueryAllergyUseCase,
        private readonly toggleAllergyUseCase: ToggleAllergyUseCase
    ) {}

    @Permission([Authority.USER])
    @HttpCode(200)
    @Get()
    async getAllergyWarnings(
        @Query('date') date: string,
        @CurrentUser() user: User
    ): Promise<string> {
        return await this.getAllergyWarningsUseCase.execute(user.id, date);
    }

    @Permission([Authority.USER])
    @Get('/type')
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
    @Patch()
    async toggleAllergy(@CurrentUser() user: User, @Body('type') type: AllergyType[]) {
        await this.toggleAllergyUseCase.execute(user.id, type);
    }
}
