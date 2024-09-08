import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TopicSubscriptionPort } from '../spi/topic-subscription.spi';
import { DeviceTokenPort } from '../spi/device-token.spi';
import { SubscriptionWebRequest } from '../../../../infrastructure/domain/notification/presentation/dto/notification.web.dto';
import { TopicSubscription } from '../model/topic-subscription';

@Injectable()
export class ToggleSubscriptionUseCase {
    constructor(
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort,
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort
    ) {}

    async execute(request: SubscriptionWebRequest, userId: string) {
        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(userId);
        
        if (!deviceToken) {
            throw new NotFoundException('Device Token Not Found');
        }

        const subscription = await this.topicSubscriptionPort.queryByDeviceTokenIdAndTopic(
            deviceToken.id,
            request.topic
        );

        if (subscription) {
            await this.topicSubscriptionPort.deleteTopicSubscription(deviceToken.id, request.topic);
        } else {
            const newSubscription = new TopicSubscription(deviceToken.id, request.topic, true);
            await this.topicSubscriptionPort.saveTopicSubscription(newSubscription);
        }
    }
}
