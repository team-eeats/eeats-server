import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { TopicSubscriptionTypeormEntity } from '../../domain/notification/persistence/entity/topic-subscription.entity';
import { DeviceTokenTypeormEntity } from '../../domain/notification/persistence/entity/device-token.entity';
import { NotificationTypeormEntity } from '../../domain/notification/persistence/entity/notification.entity';
import { TopicSubscriptionPersistenceAdapter } from '../../domain/notification/persistence/topic-subscription.persistence.adapter';
import { DeviceTokenPersistenceAdapter } from '../../domain/notification/persistence/device-token.persistence.adapter';
import { NotificationPersistenceAdapter } from '../../domain/notification/persistence/notification.persistence.adapter';
import { TopicSubscriptionPort } from '../../../application/domain/notification/spi/topic-subscription.spi';
import { DeviceTokenPort } from '../../../application/domain/notification/spi/device-token.spi';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { ToggleSubscriptionUseCase } from '../../../application/domain/notification/usecase/toggle-subscription.usecase';
import { SetDeviceTokenUseCase } from '../../../application/domain/notification/usecase/set-device-token.usecase';
import { QueryTopicSubscriptionUseCase } from '../../../application/domain/notification/usecase/query-topic-subscription.usecase';
import { ToggleAllSubscriptionsUseCase } from '../../../application/domain/notification/usecase/toggle-all-subscriptions.usecase';
import { NotificationWebAdapter } from '../../domain/notification/presentation/notification.web.adapter';
import { TopicSubscriptionMapper } from '../../domain/notification/persistence/mapper/topic-subscription.mapper';
import { DeviceTokenMapper } from '../../domain/notification/persistence/mapper/device-token.mapper';
import { NotificationMapper } from '../../domain/notification/persistence/mapper/notification.mapper';
import { FirebaseConfig } from '../../thirdparty/fcm/firebase.config';
import { FCMModule } from './fcm.module';
import { PublishEventPort } from '../../../application/common/spi/event.spi';
import { EventPublisher } from '../../event/event.publisher';

const TOPIC_SUBSCRIPTION_PORT = {
    provide: TopicSubscriptionPort,
    useClass: TopicSubscriptionPersistenceAdapter
};
const DEVICE_TOKEN_PORT = { provide: DeviceTokenPort, useClass: DeviceTokenPersistenceAdapter };
const NOTIFICATION_PORT = { provide: NotificationPort, useClass: NotificationPersistenceAdapter };

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            TopicSubscriptionTypeormEntity,
            DeviceTokenTypeormEntity,
            NotificationTypeormEntity
        ]),
        FCMModule,
        EventEmitterModule.forRoot()
    ],
    providers: [
        TOPIC_SUBSCRIPTION_PORT,
        DEVICE_TOKEN_PORT,
        NOTIFICATION_PORT,
        TopicSubscriptionMapper,
        DeviceTokenMapper,
        NotificationMapper,
        ToggleSubscriptionUseCase,
        SetDeviceTokenUseCase,
        QueryTopicSubscriptionUseCase,
        ToggleAllSubscriptionsUseCase,
        FirebaseConfig,
        {
            provide: PublishEventPort,
            useClass: EventPublisher
        }
    ],
    exports: [
        TOPIC_SUBSCRIPTION_PORT,
        DEVICE_TOKEN_PORT,
        NOTIFICATION_PORT,
        TopicSubscriptionMapper,
        DeviceTokenMapper,
        NotificationMapper,
        PublishEventPort
    ],
    controllers: [NotificationWebAdapter]
})
export class NotificationModule {}
