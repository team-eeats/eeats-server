import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicSubscriptionTypeormEntity } from '../../domain/notification/persistence/entity/topic-subscription.entity';
import { DeviceTokenTypeormEntity } from '../../domain/notification/persistence/entity/device-token.entity';
import { TopicSubscriptionPersistenceAdapter } from '../../domain/notification/persistence/topic-subscription.persistence.adapter';
import { DeviceTokenPersistenceAdapter } from '../../domain/notification/persistence/device-token.persistence.adapter';
import { TopicSubscriptionPort } from '../../../application/domain/notification/spi/topic-subscription.spi';
import { DeviceTokenPort } from '../../../application/domain/notification/spi/device-token.spi';
import { ToggleSubscriptionUseCase } from '../../../application/domain/notification/usecase/toggle-subscription.usecase';
import { SetDeviceTokenUseCase } from '../../../application/domain/notification/usecase/set-device-token.usecase';
import { NotificationWebAdapter } from '../../domain/notification/presentation/notification.web.adapter';
import { TopicSubscriptionMapper } from '../../domain/notification/persistence/mapper/topic-subscription.mapper';
import { DeviceTokenMapper } from '../../domain/notification/persistence/mapper/device-token.mapper';
import { NotificationPort } from '../../../application/domain/notification/spi/notification.spi';
import { NotificationPersistenceAdapter } from '../../domain/notification/persistence/notification.persistence.adapter';
import { NotificationTypeormEntity } from '../../domain/notification/persistence/entity/notification.entity';
import { NotificationMapper } from '../../domain/notification/persistence/mapper/notification.mapper';
import { QueryTopicSubscriptionUseCase } from '../../../application/domain/notification/usecase/query-topic-subscription.usecase';

const TOPIC_SUBSCRIPTION_PORT = { provide: TopicSubscriptionPort, useClass: TopicSubscriptionPersistenceAdapter };
const DEVICE_TOKEN_PORT = { provide: DeviceTokenPort, useClass: DeviceTokenPersistenceAdapter };
const NOTIFICATION_PORT = { provide: NotificationPort, useClass: NotificationPersistenceAdapter };
const NOTIFICATION_REPOSITORY = TypeOrmModule.forFeature([TopicSubscriptionTypeormEntity, DeviceTokenTypeormEntity, NotificationTypeormEntity]);

@Global()
@Module({
    imports: [NOTIFICATION_REPOSITORY],
    providers: [
        TOPIC_SUBSCRIPTION_PORT,
        DEVICE_TOKEN_PORT,
        NOTIFICATION_PORT,
        TopicSubscriptionMapper,
        DeviceTokenMapper,
        NotificationMapper,
        ToggleSubscriptionUseCase,
        SetDeviceTokenUseCase,
        QueryTopicSubscriptionUseCase
    ],
    exports: [TOPIC_SUBSCRIPTION_PORT, DEVICE_TOKEN_PORT, NOTIFICATION_PORT, NOTIFICATION_REPOSITORY, NotificationMapper, DeviceTokenMapper, TopicSubscriptionMapper],
    controllers: [NotificationWebAdapter]
})
export class NotificationModule {}
