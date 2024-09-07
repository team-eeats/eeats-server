import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollTypeormEntity } from '../../domain/poll/persistence/entity/poll.entity';
import { PollPersistenceAdapter } from '../../domain/poll/persistence/poll.persistence.adapter';
import { PollPort } from '../../../application/domain/poll/spi/poll.spi';
import { PollMapper } from '../../domain/poll/persistence/mapper/poll.mapper';
import { CreatePollUseCase } from '../../../application/domain/poll/usecase/create-poll.usecase';
import { UpdatePollUseCase } from '../../../application/domain/poll/usecase/update-poll.usecase';
import { DeletePollUseCase } from '../../../application/domain/poll/usecase/delete-poll.usecase';
import { QueryAllPollsUseCase } from '../../../application/domain/poll/usecase/query-all-polls.usecase';
import { PollWebAdapter } from '../../domain/poll/presentation/poll.web.adapter';

const POLL_PORT = { provide: PollPort, useClass: PollPersistenceAdapter };
const POLL_REPOSITORY = TypeOrmModule.forFeature([PollTypeormEntity]);

@Global()
@Module({
    imports: [POLL_REPOSITORY],
    providers: [
        POLL_PORT,
        PollMapper,
        CreatePollUseCase,
        UpdatePollUseCase,
        DeletePollUseCase,
        QueryAllPollsUseCase
    ],
    exports: [POLL_PORT, POLL_REPOSITORY],
    controllers: [PollWebAdapter]
})
export class PollModule {}
