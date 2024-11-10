import { LocalDateTime } from 'js-joda';
import { PollOption } from './poll-option';

export class Poll {
    id: string;
    title: string;
    description?: string;
    options: PollOption[];
    createdAt: LocalDateTime;

    public update(title: string, description: string) {
        this.title = title;
        this.description = description;
    }

    constructor(
        title: string,
        description: string | null,
        options: PollOption[],
        createdAt: LocalDateTime,
        id?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.options = options;
        this.createdAt = createdAt;
    }
}
