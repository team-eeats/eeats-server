import { Body, Controller, Get, HttpCode, Param, Post, Delete, Patch } from '@nestjs/common';
import { CreatePollUseCase } from '../../../../application/domain/poll/usecase/poll/create-poll.usecase';
import { UpdatePollUseCase } from '../../../../application/domain/poll/usecase/poll/update-poll.usecase';
import { DeletePollUseCase } from '../../../../application/domain/poll/usecase/poll/delete-poll.usecase';
import { QueryAllPollsUseCase } from '../../../../application/domain/poll/usecase/poll/query-all-polls.usecase';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { CreatePollWebRequest, UpdatePollWebRequest } from './dto/poll.web.dto';
import { QueryAllPollsResponse } from 'src/application/domain/poll/dto/poll.dto';
import { CreatePollOptionUseCase } from '../../../../application/domain/poll/usecase/poll-option/create-poll-option.usecase';
import { DeletePollOptionUseCase } from '../../../../application/domain/poll/usecase/poll-option/delete-poll-option.usecase';
import { CreatePollOptionWebRequest } from './dto/poll.option.web.dto';

@Controller('polls')
export class PollWebAdapter {
    constructor(
        private readonly createPollUseCase: CreatePollUseCase,
        private readonly updatePollUseCase: UpdatePollUseCase,
        private readonly deletePollUseCase: DeletePollUseCase,
        private readonly queryAllPollsUseCase: QueryAllPollsUseCase,
        private readonly createPollOptionUseCase: CreatePollOptionUseCase,
        private readonly deletePollOptionUseCase: DeletePollOptionUseCase
    ) {}

    @Permission([Authority.MANAGER])
    @HttpCode(201)
    @Post()
    async createPoll(@Body() request: CreatePollWebRequest) {
        await this.createPollUseCase.execute(request);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(204)
    @Patch('/:pollId')
    async updatePoll(@Param('pollId') pollId: string, @Body() request: UpdatePollWebRequest) {
        await this.updatePollUseCase.execute(pollId, request);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(204)
    @Delete(':pollId')
    async deletePoll(@Param('pollId') pollId: string): Promise<void> {
        await this.deletePollUseCase.execute(pollId);
    }

    @Get()
    async queryAllPolls(): Promise<QueryAllPollsResponse> {
        return await this.queryAllPollsUseCase.execute();
    }

    @Permission([Authority.MANAGER])
    @HttpCode(201)
    @Post('/options/:pollId')
    async createPollOption(
        @Param('pollId') pollId: string,
        @Body() request: CreatePollOptionWebRequest
    ) {
        await this.createPollOptionUseCase.execute(pollId, request);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(204)
    @Delete('/options/:optionId')
    async deletePollOption(@Param('optionId') optionId: string): Promise<void> {
        await this.deletePollOptionUseCase.execute(optionId);
    }
}
