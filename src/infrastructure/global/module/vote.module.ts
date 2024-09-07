import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteTypeormEntity } from '../../domain/vote/persistence/vote.entity';
import { VoteMapper } from '../../domain/vote/persistence/vote.mapper';
import { VotePort } from '../../..//application/domain/vote/spi/vote.spi';
import { VotePersistenceAdapter } from '../../domain/vote/persistence/vote.persistence.adapter';
import { VoteWebAdapter } from '../../domain/vote/presentation/vote.web.adapter';
import { VoteUseCase } from '../../../application/domain/vote/usecase/vote.usecase';

const VOTE_PORT = { provide: VotePort, useClass: VotePersistenceAdapter };
const VOTE_REPOSITORY = TypeOrmModule.forFeature([VoteTypeormEntity]);

@Global()
@Module({
    imports: [VOTE_REPOSITORY],
    providers: [
        VOTE_PORT,
        VoteMapper,
        VoteUseCase
    ],
    exports: [VOTE_PORT, VOTE_REPOSITORY],
    controllers: [VoteWebAdapter]
})
export class VoteModule {}
