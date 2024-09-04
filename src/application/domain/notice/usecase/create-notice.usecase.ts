import { Inject, Injectable } from '@nestjs/common';
import { NoticePort } from '../spi/notice.spi';
import { Notice } from '../notice';
import { NoticeWebRequest } from '../../../../infrastructure/domain/notice/presentation/dto/notice.web.dto';
import { LocalDate } from 'js-joda';
import { User } from '../../user/user';

@Injectable()
export class CreateNoticeUseCase {
    constructor(
        @Inject(NoticePort)
        private readonly noticePort: NoticePort
    ) {}

    async execute(request: NoticeWebRequest, user: User) {
        await this.noticePort.saveNotice(
            new Notice(user.id, request.title, request.content, LocalDate.now())
        );
    }
}
