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
            //useFactory로 동적 객체 생성, 비동기 함수 정의
            useFactory: async (firebaseConfig: FirebaseConfig) => {
                firebaseConfig.initialize(); //의존성 주입 가능
                return admin;
            },
            inject: [FirebaseConfig]
        }
    ],
    exports: ['FIREBASE_ADMIN']
})
export class FirebaseModule {}

// useFactory 없이 단순화

// import { Module, Global } from '@nestjs/common';
// import { FirebaseConfig } from '../../thirdparty/fcm/firebase.config';
// import * as admin from 'firebase-admin';

// @Global()
// @Module({
//     providers: [
//         FirebaseConfig,
//         {
//             provide: 'FIREBASE_ADMIN',
//             useValue: admin
//         }
//     ],
//     exports: ['FIREBASE_ADMIN']
// })
// export class FirebaseModule {}
