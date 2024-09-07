export class PollOption {
    id: string;
    pollId: string;
    description: string;
    imageUrl?: string;

    constructor(
        pollId: string,
        description: string,
        id?: string,
        imageUrl?: string
    ) {
        this.id = id;
        this.pollId = pollId;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
