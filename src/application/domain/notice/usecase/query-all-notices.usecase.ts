import { Injectable, Inject } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';
import { QueryAllNoticesResponse } from '../dto/notice.dto';

@Injectable()
export class QueryAllNoticesUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort
    ) {}

    async execute(): Promise<QueryAllNoticesResponse> {
        return {
            notices: await this.noticePort.queryAllNotices()
        };
    }
}
