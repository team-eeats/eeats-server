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

    constructor(
        userId: string,
        topic: Topic,
        linkIdentifier: string | null,
        title: string,
        content: string,
        isRead: boolean,
        createdAt?: LocalDate,
        id?: string
    ) {
        this.id = id;
        this.userId = userId;
        this.topic = topic;
        this.linkIdentifier = linkIdentifier;
        this.title = title;
        this.content = content;
        this.isRead = isRead;
        this.createdAt = createdAt;
    }
}

export enum Topic {
    NOTICE = 'notice',
    ALLERGY = 'allergy',
    COMMENT = 'comment'
}
