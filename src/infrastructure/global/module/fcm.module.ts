import { Module, Global } from '@nestjs/common';
import { FirebaseConfig } from '../../thirdparty/fcm/firebase.config';
import { FCMAdapter } from '../../thirdparty/fcm/fcm.adapter';
import { FCMPort } from '../../../application/common/spi/fcm.spi';

@Global()
@Module({
    providers: [
        FirebaseConfig,
        {
            provide: FCMPort,
            useClass: FCMAdapter
        }
    ],
    exports: [FCMPort]
})
export class FCMModule {}
