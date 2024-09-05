export class Vote {
    id: string;
    optionId: string;
    userId: string;

    constructor(optionId: string, userId: string, id?: string) {
        this.id = id;
        this.optionId = optionId;
        this.userId = userId;
    }
}
