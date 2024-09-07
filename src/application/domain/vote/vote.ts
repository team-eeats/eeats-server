export class Vote {
    id: string;
    pollOptionId: string;
    userId: string;

    constructor(pollOptionId: string, userId: string, id?: string) {
        this.id = id;
        this.pollOptionId = pollOptionId;
        this.userId = userId;
    }
}
