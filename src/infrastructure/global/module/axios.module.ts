import { Global, Module } from '@nestjs/common';
import { AxiosAdapter } from '../../thirdparty/axios/axios.adapter';
import { GetMealUseCase } from '../../../application/domain/meal/usecase/get-meal.usecase';
import { MealWebAdapter } from '../../domain/meal/presentation/meal.web.adapter';
import { FCMPort } from '../../../application/common/spi/fcm.spi';
import { FCMAdapter } from '../../thirdparty/fcm/fcm.adapter';
import { UserPersistenceAdapter } from '../../domain/user/persistence/user.persistence.adapter';

const MEAL_PORT = { provide: 'MealPort', useClass: AxiosAdapter };
const PUBLISH_EVENT_PORT = { provide: 'PublishEventPort', useClass: FCMAdapter };
const USER_PORT = { provide: 'UserPort', useClass: UserPersistenceAdapter };
const FCM_PORT = { provide: FCMPort, useClass: FCMAdapter };

@Global()
@Module({
    providers: [
        GetMealUseCase,
        MEAL_PORT,
        PUBLISH_EVENT_PORT,
        USER_PORT,
        FCM_PORT
    ],
    exports: [MEAL_PORT, PUBLISH_EVENT_PORT, USER_PORT, FCM_PORT],
    controllers: [MealWebAdapter]
})
export class AxiosModule {}
