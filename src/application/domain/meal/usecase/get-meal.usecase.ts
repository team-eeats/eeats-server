import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../../application/common/spi/axios.spi';

@Injectable()
export class GetMealUseCase {
    constructor(@Inject(AxiosPort) private readonly axiosPort: AxiosPort) {}

    async execute(date: string) {
        return this.axiosPort.getMealInfo(date);
    }
}
