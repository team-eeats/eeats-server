import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PublishEventPort } from '../../application/common/spi/event.spi';

@Injectable()
export class EventPublisher implements PublishEventPort {
    constructor(
        private readonly eventEmitter: EventEmitter2
    ) {}

    async publishEvent(event: any): Promise<void> {
        this.eventEmitter.emit(event.constructor.name, event);
    }
}
