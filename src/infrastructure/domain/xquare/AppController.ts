import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './AppService';

@Controller('test')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post()
    async validateOwner(@Body() body) {
        return await this.appService.validateOwner(body);
    }
}