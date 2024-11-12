import { CreatePollOptionWebRequest } from './poll-option.web.dto';
import { LocalDateTime } from 'js-joda';

export class CreatePollWebRequest {
    title: string;
    description?: string;
    startDate: LocalDateTime;
    endDate: LocalDateTime;
    pollOptions?: CreatePollOptionWebRequest[];
}

export class UpdatePollWebRequest {
    title: string;
    description?: string;
    startDate: LocalDateTime;
    endDate: LocalDateTime;
}
