import { Controller, HttpCode, Param, Post } from '@nestjs/common';
import { VoteUseCase } from '../../../../application/domain/vote/usecase/vote.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';

@Controller('votes')
export class VoteWebAdapter {
    constructor(private readonly voteUseCase: VoteUseCase) {}

    @Permission([Authority.USER, Authority.MANAGER])
    @HttpCode(204)
    @Post('/:pollOptionId')
    async vote(@Param('pollOptionId') pollOptionId: string, @CurrentUser() user: User) {
        await this.voteUseCase.execute(pollOptionId, user);
    }
}
