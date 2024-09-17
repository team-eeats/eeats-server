import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../../application/common/spi/axios.spi';
import { AllergyMealEvent } from '../../allergy/event/allergy.meal.event';
import { PublishEventPort } from '../../../../application/common/spi/event.spi';

@Injectable()
export class GetMealUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort,
        @Inject(PublishEventPort)
        private readonly publishEventPort: PublishEventPort
    ) {}

    async execute(date: string) {
        return this.axiosPort.getMealInfo(date);

        await this.publishEventPort.publishEvent(new AllergyMealEvent(date));
    }
}
