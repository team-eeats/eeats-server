export class DeviceToken {
    id: string;
    userId: string;
    token: string;

    constructor(userId: string, token: string, id?: string) {
        this.id = id;
        this.userId = userId;
        this.token = token;
    }
}
