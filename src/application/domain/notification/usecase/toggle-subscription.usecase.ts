import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TopicSubscriptionPort } from '../spi/topic-subscription.spi';
import { DeviceTokenPort } from '../spi/device-token.spi';
import { Topic } from '../model/notification';
import { FCMPort } from '../../../common/spi/fcm.spi';

@Injectable()
export class ToggleSubscriptionUseCase {
    constructor(
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort,
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort,
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort
    ) {}

    async execute(topic: Topic, userId: string): Promise<void> {
        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(userId);

        if (!deviceToken) {
            throw new NotFoundException('Device Token Not Found');
        }

        const subscription = await this.topicSubscriptionPort.queryByDeviceTokenIdAndTopic(
            deviceToken.id,
            topic
        );

        if (subscription && subscription.isSubscribed) {
            await this.fcmPort.unsubscribeTopic(deviceToken.token, topic);
            await this.topicSubscriptionPort.saveTopicSubscription({
                deviceTokenId: deviceToken.id,
                topic: topic,
                isSubscribed: false
            });
        } else {
            await this.fcmPort.subscribeTopic(deviceToken.token, topic);
            await this.topicSubscriptionPort.saveTopicSubscription({
                deviceTokenId: deviceToken.id,
                topic: topic,
                isSubscribed: true
            });
        }
    }
}
