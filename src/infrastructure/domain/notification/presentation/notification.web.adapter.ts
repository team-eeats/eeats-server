import { Body, Controller, Post, Get, HttpCode, Patch, Query } from '@nestjs/common';
import { SetDeviceTokenWebRequest, SubscriptionWebRequest } from './dto/notification.web.dto';
import { Permission } from '../../../global/decorator/authority.decorator';
import { Authority } from '../../user/persistence/user.entity';
import { CurrentUser } from '../../../global/decorator/current-user.decorator';
import { User } from '../../../../application/domain/user/user';
import { SetDeviceTokenUseCase } from '../../../../application/domain/notification/usecase/set-device-token.usecase';
import { ToggleSubscriptionUseCase } from '../../../../application/domain/notification/usecase/toggle-subscription.usecase';
import { QueryMySubscriptionsResponse } from '../../../../application/domain/notification/dto/notification.dto';
import { QueryTopicSubscriptionUseCase } from '../../../../application/domain/notification/usecase/query-topic-subscription.usecase';

@Controller('notifications')
export class NotificationWebAdapter {
    constructor(
        private readonly setDeviceTokenUseCase: SetDeviceTokenUseCase,
        private readonly toggleSubscriptionUseCase: ToggleSubscriptionUseCase,
        private readonly queryTopicSubscriptionUseCase: QueryTopicSubscriptionUseCase
    ) {}

    @Permission([Authority.USER, Authority.MANAGER])
    @Post('/token')
    async setDeviceToken(
        @Body() request: SetDeviceTokenWebRequest,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.setDeviceTokenUseCase.execute(request, user)
    }

    @Permission([Authority.USER, Authority.MANAGER])
    @Patch('/topic')
    @HttpCode(204)
    async toggleSubscription(
        @Body() request: SubscriptionWebRequest,
        @CurrentUser() user: User
    ): Promise<void> {
        await this.toggleSubscriptionUseCase.execute(request, user.id);
    }

    @Permission([Authority.USER, Authority.MANAGER])
    @Get('/topic')
    async queryMySubscriptions(
        @Query('deviceToken') deviceToken: string
    ): Promise<QueryMySubscriptionsResponse> {
        return this.queryTopicSubscriptionUseCase.execute(deviceToken);
    }
}
