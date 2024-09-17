import { Notice } from '../notice';

export class NoticePostedEvent {
    constructor(
        public readonly notice: Notice
    ) {}
}
