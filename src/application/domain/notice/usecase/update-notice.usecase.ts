import { Inject, Injectable } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';
import { UpdateNoticeRequest } from '../dto/notice.dto';

@Injectable()
export class UpdateNoticeUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort
    ) {}

    async execute(noticeId: string, request: UpdateNoticeRequest): Promise<void> {
        const notice = await this.noticePort.queryNoticeById(noticeId);

        notice.update(request.title, request.content);
        await this.noticePort.saveNotice(notice);
    }
}
