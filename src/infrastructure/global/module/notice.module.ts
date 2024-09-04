import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeTypeormEntity } from '../../domain/notice/persistence/notice.entity';
import { NoticePersistenceAdapter } from '../../domain/notice/persistence/notice.persistence.adapter';
import { NoticePort } from '../../../application/domain/notice/spi/notice.spi';
import { NoticeMapper } from '../../domain/notice/persistence/notice.mapper';
import { CreateNoticeUseCase } from '../../../application/domain/notice/usecase/create-notice.usecase';
import { UpdateNoticeUseCase } from '../../../application/domain/notice/usecase/update-notice.usecase';
import { QueryAllNoticesUseCase } from '../../../application/domain/notice/usecase/query-all-notices.usecase';
import { DeleteNoticeUseCase } from '../../../application/domain/notice/usecase/delete-notice.usecase';
import { QueryNoticeDetailUseCase } from '../../../application/domain/notice/usecase/query-notice-detail.usecase';
import { NoticeWebAdapter } from 'src/infrastructure/domain/notice/presentation/notice.web.adapter';

const NOTICE_PORT = { provide: NoticePort, useClass: NoticePersistenceAdapter };
const NOTICE_REPOSITORY = TypeOrmModule.forFeature([NoticeTypeormEntity]);

@Global()
@Module({
    imports: [NOTICE_REPOSITORY],
    providers: [
        NOTICE_PORT,
        NoticeMapper,
        CreateNoticeUseCase,
        UpdateNoticeUseCase,
        QueryAllNoticesUseCase,
        DeleteNoticeUseCase,
        QueryNoticeDetailUseCase
    ],
    exports: [NOTICE_PORT, NOTICE_REPOSITORY],
    controllers: [NoticeWebAdapter]
})
export class NoticeModule {}
