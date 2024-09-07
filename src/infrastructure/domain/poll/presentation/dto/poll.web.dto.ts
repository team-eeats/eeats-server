import { CreatePollOptionWebRequest } from './poll.option.web.dto';

export class CreatePollWebRequest {
    title: string;
    description?: string;
    pollOptions?: CreatePollOptionWebRequest[];
}

export class UpdatePollWebRequest {
    title: string;
    description?: string;
}
