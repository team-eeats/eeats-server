import { LocalDateTime } from 'js-joda';
import { Comment } from '../comment/comment';

export class Suggestion {
    id: string;
    userId: string;
    title: string;
    content: string;
    createdAt: LocalDateTime;
    comment?: Comment;

    public update(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    constructor(
        userId: string,
        title: string,
        content: string,
        createdAt: LocalDateTime,
        id?: string,
        comment?: Comment
    ) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.comment = comment;
    }
}
