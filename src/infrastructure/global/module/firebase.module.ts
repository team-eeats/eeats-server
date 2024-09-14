import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseConfig } from '../../thirdparty/fcm/firebase.config';
import * as admin from 'firebase-admin';


@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        FirebaseConfig,
        {
            provide: 'FIREBASE_ADMIN',
            useFactory: async (firebaseConfig: FirebaseConfig) => {
                firebaseConfig.initialize();
                return admin;
            },
            inject: [FirebaseConfig]
        }
    ],
    exports: ['FIREBASE_ADMIN']
})
export class FirebaseModule {}
