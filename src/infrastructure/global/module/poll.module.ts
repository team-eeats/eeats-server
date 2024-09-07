import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollTypeormEntity } from '../../domain/poll/persistence/entity/poll.entity';
import { PollPersistenceAdapter } from '../../domain/poll/persistence/poll.persistence.adapter';
import { PollPort } from '../../../application/domain/poll/spi/poll.spi';
import { PollMapper } from '../../domain/poll/persistence/mapper/poll.mapper';
import { CreatePollUseCase } from '../../../application/domain/poll/usecase/poll/create-poll.usecase';
import { UpdatePollUseCase } from '../../../application/domain/poll/usecase/poll/update-poll.usecase';
import { DeletePollUseCase } from '../../../application/domain/poll/usecase/poll//delete-poll.usecase';
import { QueryAllPollsUseCase } from '../../../application/domain/poll/usecase/poll/query-all-polls.usecase';
import { PollWebAdapter } from '../../domain/poll/presentation/poll.web.adapter';
import { PollOptionModule } from './poll.option.module';
import { PollOptionMapper } from '../../../infrastructure/domain/poll/persistence/mapper/poll.option.mapper';

const POLL_PORT = { provide: PollPort, useClass: PollPersistenceAdapter };
const POLL_REPOSITORY = TypeOrmModule.forFeature([PollTypeormEntity]);

@Global()
@Module({
    imports: [POLL_REPOSITORY, PollOptionModule],
    providers: [
        POLL_PORT,
        PollMapper,
        PollOptionMapper,
        CreatePollUseCase,
        UpdatePollUseCase,
        DeletePollUseCase,
        QueryAllPollsUseCase
    ],
    exports: [POLL_PORT, POLL_REPOSITORY],
    controllers: [PollWebAdapter]
})
export class PollModule {}
