import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfig implements OnModuleInit {
    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        this.initialize();
    }

    initialize() {
        if (admin.apps.length === 0) {
            const firebaseConfigPath = this.configService.get<string>('FCM_PATH');
            const serviceAccount = require(firebaseConfigPath);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
    }
}
