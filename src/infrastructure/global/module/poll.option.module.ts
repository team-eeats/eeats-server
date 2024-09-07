import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollOptionTypeormEntity } from '../../domain/poll/persistence/entity/poll.option.entity';
import { PollOptionPersistenceAdapter } from '../../domain/poll/persistence/poll.option.persistence.adapter';
import { PollOptionPort } from '../../../application/domain/poll/spi/poll.option.spi';
import { PollOptionMapper } from '../../domain/poll/persistence/mapper/poll.option.mapper';
import { CreatePollOptionUseCase } from '../../../application/domain/poll/usecase/poll-option/create-poll-option.usecase';
import { DeletePollOptionUseCase } from '../../../application/domain/poll/usecase/poll-option/delete-poll-option.usecase';
import { PollOptionWebAdapter } from '../../domain/poll/presentation/poll.option.web.adapter';

const POLL_OPTION_PORT = { provide: PollOptionPort, useClass: PollOptionPersistenceAdapter };
const POLL_OPTION_REPOSITORY = TypeOrmModule.forFeature([PollOptionTypeormEntity]);

@Global()
@Module({
    imports: [POLL_OPTION_REPOSITORY],
    providers: [
        POLL_OPTION_PORT,
        PollOptionMapper,
        CreatePollOptionUseCase,
        DeletePollOptionUseCase
    ],
    exports: [POLL_OPTION_PORT, POLL_OPTION_REPOSITORY],
    controllers: [PollOptionWebAdapter]
})
export class PollOptionModule {}
