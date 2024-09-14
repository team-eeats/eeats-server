import { Injectable, Inject } from '@nestjs/common';
import { TopicSubscriptionPort } from '../spi/topic-subscription.spi';
import { DeviceTokenPort } from '../spi/device-token.spi';
import { FCMPort } from '../../../common/spi/fcm.spi';
import { Topic } from '../model/notification';

@Injectable()
export class ToggleAllSubscriptionsUseCase {
    constructor(
        @Inject(TopicSubscriptionPort)
        private readonly topicSubscriptionPort: TopicSubscriptionPort,
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort,
        @Inject(FCMPort)
        private readonly fcmPort: FCMPort
    ) {}

    async execute(userId: string): Promise<void> {
        const deviceToken = await this.deviceTokenPort.queryDeviceTokenByUserId(userId);

        if (!deviceToken) {
            throw new Error('Device Token Not Found');
        }

        const isSubscribed = await Promise.all(
            Object.values(Topic).map(async (topic) => {
                const subscription = await this.topicSubscriptionPort.queryByDeviceTokenIdAndTopic(deviceToken.id, topic);
                return !!subscription;
            })
        ).then((results) => results.some((subscribed) => subscribed));

        if (isSubscribed) {
            await Promise.all(
                Object.values(Topic).map(async (topic) => {
                    await this.fcmPort.unsubscribeTopic(deviceToken.token, topic);
                    await this.topicSubscriptionPort.saveTopicSubscription({
                        deviceTokenId: deviceToken.id,
                        topic: topic,
                        isSubscribed: false,
                    });
                })
            );
        } else {
            await Promise.all(
                Object.values(Topic).map(async (topic) => {
                    await this.fcmPort.subscribeTopic(deviceToken.token, topic);
                    await this.topicSubscriptionPort.saveTopicSubscription({
                        deviceTokenId: deviceToken.id,
                        topic: topic,
                        isSubscribed: true,
                    });
                })
            );
        }
    }
}
