import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { SuggestionModule } from './infrastructure/global/module/suggestion.module';
import { CommentModule } from './infrastructure/global/module/comment.module';
import { NoticeModule } from './infrastructure/global/module/notice.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';

@Module({
    imports: [
        UserModule,
        AuthModule,
        SuggestionModule,
        CommentModule,
        NoticeModule,
        TypeormConfigModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {}
