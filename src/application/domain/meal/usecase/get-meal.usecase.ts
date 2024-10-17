import { Inject, Injectable } from '@nestjs/common';
import { AxiosPort } from '../../../../application/common/spi/axios.spi';
import { AllergyMealEvent } from '../../allergy/event/allergy.meal.event';
import { PublishEventPort } from '../../../../application/common/spi/event.spi';
import { UserPort } from '../../user/spi/user.spi';

@Injectable()
export class GetMealUseCase {
    constructor(
        @Inject(AxiosPort)
        private readonly axiosPort: AxiosPort,
        @Inject(PublishEventPort)
        private readonly publishEventPort: PublishEventPort,
        @Inject(UserPort)
        private readonly userPort: UserPort
    ) {}

    async execute(date: string) {
        const mealInfo = await this.axiosPort.getMealInfo(date);
        const usersWithAllergies = await this.userPort.queryUsersWithAllergies();

        await this.publishEventPort.publishEvent(
            new AllergyMealEvent(mealInfo, usersWithAllergies, date)
        )

        return mealInfo;
    }
}
