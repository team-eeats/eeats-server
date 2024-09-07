import { MealPort } from '../../domain/meal/spi/meal.spi';

export interface AxiosPort extends MealPort {}

export const AxiosPort = Symbol('IAxiosPort');
