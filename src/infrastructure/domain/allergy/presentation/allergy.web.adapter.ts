import { Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../../../application/domain/user/authority';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { GetAllergyWarningsUseCase } from '../../../../application/domain/allergy/usecase/get-allergy-warning.usecase';

@Controller('allergy')
export class AllergyWebAdapter {
    constructor(
        private readonly getAllergyWarningsUseCase: GetAllergyWarningsUseCase
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
}
