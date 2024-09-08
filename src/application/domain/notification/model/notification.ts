import { LocalDate } from 'js-joda';

export class Notification {
    id: string;
    userId: string;
    topic: Topic;
    linkIdentifier: string | null;
    title: string;
    content: string;
    createdAt: LocalDate;
    isRead: boolean;
}

export enum Topic {
    NOTICE = '공지',
    ALLERGY = '알레르기',
    COMMENT = '답변'
}
