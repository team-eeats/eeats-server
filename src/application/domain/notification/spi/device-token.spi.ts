import { DeviceToken } from '../model/device-token';

export interface DeviceTokenPort {
    saveDeviceToken(deviceToken: DeviceToken): Promise<void>;

    queryDeviceTokenByUserId(userId: string): Promise<DeviceToken | null>;
}

export const DeviceTokenPort = Symbol('IDeviceTokenPort');
