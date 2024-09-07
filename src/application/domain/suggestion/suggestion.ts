import { LocalDate } from 'js-joda';
import { Comment } from '../comment/comment';

export class Suggestion {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: LocalDate;
    comment?: Comment;

    public update(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    constructor(userId: string, title: string, content: string, createdAt: LocalDate, id?: string, comment?: Comment) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.comment = comment;
    }
}
