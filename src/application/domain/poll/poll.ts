import { LocalDateTime } from 'js-joda';
import { PollOption } from './poll-option';

export class Poll {
    id: string;
    title: string;
    description?: string;
    startDate: LocalDateTime;
    endDate: LocalDateTime;
    options: PollOption[];
    createdAt: LocalDateTime;
    isHidden: boolean;

    public update(title: string, description: string, startDate: LocalDateTime, endDate: LocalDateTime) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public toggleHidden() {
        this.isHidden = !this.isHidden;
    }

    constructor(
        title: string,
        description: string | null,
        startDate: LocalDateTime,
        endDate: LocalDateTime,
        options: PollOption[],
        createdAt: LocalDateTime,
        isHidden: boolean,
        id?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.options = options;
        this.createdAt = createdAt;
        this.isHidden = isHidden;
    }
}
