import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Topic } from '../../../application/domain/notification/model/notification';
import { Notification } from '../../../application/domain/notification/model/notification';

@Injectable()
export class FcmAdapter {
    private firebaseInstance = admin.messaging();

    async subscribeTopic(token: string, topic: Topic) {
        try {
            await this.firebaseInstance.subscribeToTopic(token, topic);
        } catch (error) {
            throw new Error('Failed to subscribe to topic');
        }
    }

    async unsubscribeTopic(token: string, topic: Topic) {
        try {
            await this.firebaseInstance.unsubscribeFromTopic(token, topic);
        } catch (error) {
            throw new Error('Failed to unsubscribe from topic');
        }
    }

    async sendMessageToDevice(token: string, notification: Notification) {
        const message = {
            notification: {
                title: notification.title,
                body: notification.content
            },
            token: token
        };

        try {
            await this.firebaseInstance.send(message);
        } catch (error) {
            throw new Error('Failed to send message');
        }
    }

    async sendMessageToTopic(topic: Topic, notification: Notification) {
        const message = {
            notification: {
                title: notification.title,
                body: notification.content
            },
            topic: topic
        };

        try {
            await this.firebaseInstance.send(message);
        } catch (error) {
            throw new Error('Failed to send message to topic');
        }
    }
}
