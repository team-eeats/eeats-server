import { Suggestion } from '../../suggestion/suggestion';

export class CommentAddedEvent {
    constructor(public readonly suggestion: Suggestion) {}
}
