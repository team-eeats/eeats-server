import { LocalDateTime } from 'js-joda';

export class Comment {
    id: string;
    content: string;
    userId: string;
    suggestionId: string;
    createdAt?: LocalDateTime;

    constructor(
        content: string,
        userId: string,
        suggestionId: string,
        id?: string,
        createdAt?: LocalDateTime
    ) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.suggestionId = suggestionId;
        this.createdAt = createdAt;
    }
}
