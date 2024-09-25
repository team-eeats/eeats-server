import { Body, Controller, Delete, HttpCode, Param, Post } from '@nestjs/common';
import { CreatePollOptionUseCase } from '../../../../application/domain/poll/usecase/poll-option/create-poll-option.usecase';
import { DeletePollOptionUseCase } from '../../../../application/domain/poll/usecase/poll-option/delete-poll-option.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../../../application/domain/user/authority';
import { CreatePollOptionWebRequest } from './dto/poll-option.web.dto';

@Controller('options')
export class PollOptionWebAdapter {
    constructor(
        private readonly createPollOptionUseCase: CreatePollOptionUseCase,
        private readonly deletePollOptionUseCase: DeletePollOptionUseCase
    ) {}

    @Permission([Authority.MANAGER])
    @HttpCode(201)
    @Post('/:pollId')
    async createPollOption(
        @Param('pollId') pollId: string,
        @Body() request: CreatePollOptionWebRequest
    ) {
        await this.createPollOptionUseCase.execute(pollId, request);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(204)
    @Delete(':optionId')
    async deletePollOption(@Param('optionId') optionId: string): Promise<void> {
        await this.deletePollOptionUseCase.execute(optionId);
    }
}
