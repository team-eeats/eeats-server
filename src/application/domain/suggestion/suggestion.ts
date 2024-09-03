import { LocalDate } from 'js-joda';

export class Suggestion {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: LocalDate;

    public update(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    constructor(
        userId: string,
        title: string,
        content: string,
        createdAt: LocalDate,
        id?: string
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
