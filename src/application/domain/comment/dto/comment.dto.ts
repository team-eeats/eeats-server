export class CommentResponse {
    id: string;
    content: string;
}

export class CreateCommentResponse {
    constructor(
        public readonly id: string
    ) {}
}
