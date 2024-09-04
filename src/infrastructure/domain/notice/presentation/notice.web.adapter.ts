import { Body, Controller, Get, HttpCode, Param, Post, Delete, Patch } from '@nestjs/common';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { NoticeResponse, QueryAllNoticesResponse } from '../../../../application/domain/notice/dto/notice.dto';
import { User } from '../../../../application/domain/user/user';
import { NoticeWebRequest } from './dto/notice.web.dto';
import { QueryAllNoticesUseCase } from '../../../../application/domain/notice/usecase/query-all-notices.usecase';
import { CreateNoticeUseCase } from '../../../../application/domain/notice/usecase/create-notice.usecase';
import { UpdateNoticeUseCase } from '../../../../application/domain/notice/usecase/update-notice.usecase';
import { DeleteNoticeUseCase } from '../../../../application/domain/notice/usecase/delete-notice.usecase';
import { QueryNoticeDetailUseCase } from '../../../../application/domain/notice/usecase/query-notice-detail.usecase';

@Controller('notices')
export class NoticeWebAdapter {
    constructor(
        private readonly createNoticeUseCase: CreateNoticeUseCase,
        private readonly updateNoticeUseCase: UpdateNoticeUseCase,
        private readonly deleteNoticeUseCase: DeleteNoticeUseCase,
        private readonly QueryAllNoticesUseCase: QueryAllNoticesUseCase,
        private readonly queryNoticeDetailUseCase: QueryNoticeDetailUseCase
    ) {}

    @Permission([Authority.MANAGER])
    @HttpCode(201)
    @Post()
    async createNotice(@Body() request: NoticeWebRequest, @CurrentUser() user: User) {
        await this.createNoticeUseCase.execute(request, user);
    }

    @Permission([Authority.MANAGER])
    @HttpCode(204)
    @Patch('/:noticeId')
    async updateNotice(
        @Param('noticeId') noticeId: string,
        @Body() request: NoticeWebRequest
    ) {
        await this.updateNoticeUseCase.execute(noticeId, request);
    }

    @HttpCode(204)
    @Permission([Authority.MANAGER])
    @Delete(':noticeId')
    async deleteNotice(
        @Param('noticeId') noticeId: string,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.deleteNoticeUseCase.execute(noticeId, user.id);
    }

    @Get()
    async queryAllNotices(): Promise<QueryAllNoticesResponse> {
        return await this.QueryAllNoticesUseCase.execute();
    }

    @Get('/details/:noticeId')
    async queryNoticeDetails(
        @Param('noticeId') noticeId: string
    ): Promise<NoticeResponse> {
        return this.queryNoticeDetailUseCase.execute(noticeId);
    }
}
