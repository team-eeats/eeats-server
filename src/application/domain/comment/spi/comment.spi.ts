import { CommentResponse } from '../dto/comment.dto';
import { Comment } from '../comment';

export interface CommentPort {
    querySuggestionComment(suggestionId: string, userId: string): Promise<CommentResponse>;

    saveComment(comment: Comment): Promise<Comment>;

    deleteComment(comment: Comment): Promise<void>;

    queryCommentById(commentId: string): Promise<Comment>;
}

export const CommentPort = Symbol('ICommentPort');
