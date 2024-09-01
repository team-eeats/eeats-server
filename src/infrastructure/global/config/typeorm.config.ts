import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'mysql',
                host: config.get('DB_URL'),
                port: Number(config.get('DB_PORT')),
                database: config.get('DB_NAME'),
                username: config.get('DB_USERNAME'),
                password: config.get('DB_PASSWORD'),
                synchronize: true,
                autoLoadEntities: true,
                logging: true,
                namingStrategy: new SnakeNamingStrategy()
            })
        })
    ]
})
export class TypeormConfigModule {}
