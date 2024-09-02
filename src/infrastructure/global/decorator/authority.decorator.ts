import { Reflector } from '@nestjs/core';

export const Permission = Reflector.createDecorator<string[]>();
