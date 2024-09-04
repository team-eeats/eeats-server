import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';
import { NoticeResponse } from '../dto/notice.dto';

@Injectable()
export class QueryNoticeDetailUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort
    ) {}

    async execute(noticeId: string): Promise<NoticeResponse> {
        const notice = await this.noticePort.queryNoticeById(noticeId);
        if (!notice) {
            throw new NotFoundException('Notice Not Found');
        }

        return {
            id: notice.id,
            title: notice.title,
            content: notice.content,
            createdAt: notice.createdAt
        };
    }
}
