import { Injectable, Inject } from '@nestjs/common';
import { DeviceTokenPort } from '../spi/device-token.spi';
import { DeviceToken } from '../model/device-token';
import { User } from '../../user/user';

@Injectable()
export class SetDeviceTokenUseCase {
    constructor(
        @Inject(DeviceTokenPort)
        private readonly deviceTokenPort: DeviceTokenPort
    ) {}

    async execute(deviceToken: DeviceToken, user: User): Promise<void> {
        await this.deviceTokenPort.saveDeviceToken(new DeviceToken(user.id, deviceToken.token));
    }
}
