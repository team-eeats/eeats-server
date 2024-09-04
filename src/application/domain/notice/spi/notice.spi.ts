import { NoticeResponse } from '../dto/notice.dto';
import { Notice } from '../notice';

export interface NoticePort {
    saveNotice(notice: Notice): Promise<Notice>;

    queryNoticeById(id: string): Promise<Notice>;

    deleteNotice(notice: Notice): Promise<void>;

    queryAllNotices(): Promise<NoticeResponse[]>;

}

export const NoticePort = Symbol('INoticePort');
