import { LocalDate } from 'js-joda';

export class NoticeResponse {
    id: string;
    title: string;
    content: string;
    createdAt: LocalDate;
}

export class UpdateNoticeRequest {
    title: string;
    content: string;
}

export class QueryAllNoticesResponse {
    notices: NoticeResponse[];
}
