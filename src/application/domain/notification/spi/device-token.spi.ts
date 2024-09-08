import { DeviceToken } from '../model/device-token';

export interface DeviceTokenPort {
    saveDeviceToken(deviceToken: DeviceToken): Promise<void>;

    queryDeviceTokenByUserId(userId: string): Promise<DeviceToken | null>;

    queryDeviceTokenIdByDeviceToken(deviceToken: string): Promise<string | null>;
}

export const DeviceTokenPort = Symbol('IDeviceTokenPort');
