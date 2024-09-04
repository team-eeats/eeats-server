import { Injectable, Inject, NotFoundException, ForbiddenException } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';

@Injectable()
export class DeleteNoticeUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort
    ) {}

    async execute(noticeId: string, currentUserId: string) {
        const notice = await this.noticePort.queryNoticeById(noticeId);
        if (!notice) {
            throw new NotFoundException('Notice Not Found');
        }

        if (notice.userId !== currentUserId) {
            throw new ForbiddenException('Invalid User');
        }

        await this.noticePort.deleteNotice(notice);
    }
}
