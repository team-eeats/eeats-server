import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollPort } from '../../../application/domain/poll/spi/poll.spi';
import { CreatePollUseCase } from '../../../application/domain/poll/usecase/poll/create-poll.usecase';
import { DeletePollUseCase } from '../../../application/domain/poll/usecase/poll/delete-poll.usecase';
import { QueryAllPollsUseCase } from '../../../application/domain/poll/usecase/poll/query-all-polls.usecase';
import { UpdatePollUseCase } from '../../../application/domain/poll/usecase/poll/update-poll.usecase';
import { PollTypeormEntity } from '../../domain/poll/persistence/entity/poll.entity';
import { PollOptionMapper } from '../../domain/poll/persistence/mapper/poll-option.mapper';
import { PollMapper } from '../../domain/poll/persistence/mapper/poll.mapper';
import { PollPersistenceAdapter } from '../../domain/poll/persistence/poll.persistence.adapter';
import { PollWebAdapter } from '../../domain/poll/presentation/poll.web.adapter';

const POLL_PORT = { provide: PollPort, useClass: PollPersistenceAdapter };
const POLL_REPOSITORY = TypeOrmModule.forFeature([PollTypeormEntity]);

@Global()
@Module({
    imports: [POLL_REPOSITORY],
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
