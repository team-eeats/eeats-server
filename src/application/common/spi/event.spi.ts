export interface PublishEventPort {

    publishEvent(event: any): Promise<void>;
}

export const PublishEventPort = Symbol('IPublishEventPort');
