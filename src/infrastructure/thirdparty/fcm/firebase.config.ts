import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseConfig implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const firebaseConfigPath = this.configService.get<string>('FCM_PATH');
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfigPath),
      });
    }
  }
}
