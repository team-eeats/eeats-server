export class PollOption {
    id: string;
    pollId: string;
    userId: string;
    description: string;
    imageUrl?: string;

    constructor(
        pollId: string,
        description: string,
        userId: string,
        id?: string,
        imageUrl?: string
    ) {
        this.id = id;
        this.pollId = pollId;
        this.userId = userId;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
