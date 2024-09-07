import { Module } from '@nestjs/common';
import { UserModule } from './infrastructure/global/module/user.module';
import { AuthModule } from './infrastructure/global/module/auth.module';
import { SuggestionModule } from './infrastructure/global/module/suggestion.module';
import { CommentModule } from './infrastructure/global/module/comment.module';
import { NoticeModule } from './infrastructure/global/module/notice.module';
import { ConfigModule } from '@nestjs/config';
import { TypeormConfigModule } from './infrastructure/global/config/typeorm.config';
import { PollModule } from './infrastructure/global/module/poll.module';
import { VoteModule } from './infrastructure/global/module/vote.module';
import { ImageModule } from './infrastructure/global/module/image.module';
import { AwsModule } from './infrastructure/global/module/aws.module';

@Module({
    imports: [
        UserModule,
        AuthModule,
        SuggestionModule,
        CommentModule,
        NoticeModule,
        PollModule,
        VoteModule,
        ImageModule,
        TypeormConfigModule,
        AwsModule,
        ConfigModule.forRoot({ isGlobal: true })
    ]
})
export class AppModule {}
