import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';

@Module({
    imports: [
        UserModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true }),
    ],
})
export class AppModule {}