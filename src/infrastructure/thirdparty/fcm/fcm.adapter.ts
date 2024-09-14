import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { Notification } from '../../../application/domain/notification/model/notification';
import { Topic } from '../../../application/domain/notification/model/notification';

@Injectable()
export class FCMAdapter implements FCMPort {
    async sendMessageToDevice(token: string, notification: Notification): Promise<void> {
        const message = {
            token,
            notification: {
                title: notification.title,
                body: notification.content,
            },
            android: {
                data: {
                    detail_id: notification.linkIdentifier.toString(),
                    topic: notification.topic.toString(),
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        'custom-data': {
                            detail_id: notification.linkIdentifier.toString(),
                            topic: notification.topic.toString(),
                        },
                    },
                },
            },
        };

        try {
            await admin.messaging().send(message);
        } catch (error) {
            throw new Error('Failed To Send To Device')
        }
    }

    async sendMessageToTopic(topic: string, notification: Notification): Promise<void> {
        const message = {
            topic,
            notification: {
                title: notification.title,
                body: notification.content,
            },
            android: {
                data: {
                    detail_id: notification.linkIdentifier.toString(),
                    topic: notification.topic.toString(),
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        'custom-data': {
                            detail_id: notification.linkIdentifier.toString(),
                            topic: notification.topic.toString(),
                        },
                    },
                },
            },
        };

        try {
            await admin.messaging().send(message);
        } catch (error) {
            throw new Error('Failed To Send Message')
        }
    }

    async subscribeTopic(token: string, topic: Topic): Promise<void> {
        try {
            await admin.messaging().subscribeToTopic([token], topic.toString());
        } catch (error) {
            throw new Error('Failed To Subscribe')
        }
    }

    async unsubscribeTopic(token: string, topic: Topic): Promise<void> {
        try {
            await admin.messaging().unsubscribeFromTopic([token], topic.toString());
        } catch (error) {
            throw new Error('Failed To Unsubscribe')
        }
    }
}
