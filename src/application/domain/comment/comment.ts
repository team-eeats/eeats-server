import { LocalDate } from 'js-joda';

export class Comment {
    id: string;
    content: string;
    userId: string;
    suggestionId: string;
    createdAt?: LocalDate;

    constructor(
        content: string,
        userId: string,
        suggestionId: string,
        id?: string,
        createdAt?: LocalDate
    ) {
        this.id = id;
        this.content = content;
        this.userId = userId;
        this.suggestionId = suggestionId;
        this.createdAt = createdAt;
    }
}
