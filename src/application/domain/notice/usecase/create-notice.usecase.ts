import { Inject, Injectable } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';
import { Notice } from '../notice';
import { NoticeWebRequest } from '../../../../infrastructure/domain/notice/presentation/dto/notice.web.dto';
import { LocalDate } from 'js-joda';
import { User } from '../../user/user';
import { CreateNoticeResponse } from '../dto/notice.dto';
import { PublishEventPort } from '../../../common/spi/event.spi';
import { NoticePostedEvent } from '../../../domain/notice/event/notice.posted.event';

@Injectable()
export class CreateNoticeUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort,
        @Inject(PublishEventPort)
        private readonly publishEventPort: PublishEventPort
    ) {}

    async execute(request: NoticeWebRequest, user: User): Promise<CreateNoticeResponse> {
        const notice = await this.noticePort.saveNotice(
            new Notice(user.id, request.title, request.content, LocalDate.now())
        );

        await this.publishEventPort.publishEvent(new NoticePostedEvent(notice));

        return new CreateNoticeResponse(notice.id);
    }
}
