import { Injectable, Inject } from '@nestjs/common';
import { DeviceTokenPort } from '../spi/device-token.spi';
import { DeviceToken } from '../model/device-token';
import { User } from '../../user/user';
import { SetDeviceTokenWebRequest } from 'src/infrastructure/domain/notification/presentation/dto/notification.web.dto';

@Injectable()
export class SetDeviceTokenUseCase {
    constructor(
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort
    ) {}

    async execute(request: SetDeviceTokenWebRequest, user: User): Promise<void> {
        await this.deviceTokenPort.saveDeviceToken(new DeviceToken(user.id, request.deviceToken));
    }
}
