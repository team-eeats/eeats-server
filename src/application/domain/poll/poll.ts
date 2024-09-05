import { LocalDate } from 'js-joda';
import { PollOption } from './poll.option';

export class Poll {
    id: string;
    userId: string;
    title: string;
    description?: string;
    options: PollOption[];
    createdAt: LocalDate;

    public update(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    constructor(title: string, description: string | null, userId: string, options: PollOption[], createdAt: LocalDate, id?: string) {
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.description = description;
        this.options = options;
        this.createdAt = createdAt;
    }
}
