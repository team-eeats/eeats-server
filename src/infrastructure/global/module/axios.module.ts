import { Global, Module } from '@nestjs/common';
import { AxiosPort } from '../../../application/common/spi/axios.spi';
import { AxiosAdapter } from '../../thirdparty/axios/axios.adapter';

const MEAL_PORT = { provide: AxiosPort, useClass: AxiosAdapter };

@Global()
@Module({
    providers: [MEAL_PORT],
    exports: [MEAL_PORT]
})
export class AxiosModule {}
