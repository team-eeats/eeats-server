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

@Controller('polls')
export class PollWebAdapter {
    constructor(
        private readonly createPollUseCase: CreatePollUseCase,
        private readonly updatePollUseCase: UpdatePollUseCase,
        private readonly deletePollUseCase: DeletePollUseCase,
        private readonly queryAllPollsUseCase: QueryAllPollsUseCase
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

}
