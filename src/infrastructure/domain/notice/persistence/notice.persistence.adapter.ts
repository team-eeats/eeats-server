import { Injectable } from '@nestjs/common';
import { NoticePort } from '../../../../application/domain/notice/spi/notice.spi';
import { Notice } from '../../../../application/domain/notice/notice';
import { InjectRepository } from '@nestjs/typeorm';
import { NoticeTypeormEntity } from './notice.entity';
import { Repository } from 'typeorm';
import { NoticeMapper } from './notice.mapper';
import { NoticeResponse } from '../../../../application/domain/notice/dto/notice.dto';

@Injectable()
export class NoticePersistenceAdapter implements NoticePort {
    constructor(
        @InjectRepository(NoticeTypeormEntity)
        private readonly noticeRepository: Repository<NoticeTypeormEntity>,
        private readonly noticeMapper: NoticeMapper
    ) {}

    async saveNotice(notice: Notice): Promise<Notice> {
        const entity = await this.noticeMapper.toEntity(notice);

        return this.noticeMapper.toDomain(await this.noticeRepository.save(entity));
    }

    async queryNoticeById(noticeId: string): Promise<Notice> {
        return await this.noticeMapper.toDomain(
            await this.noticeRepository.findOne({
                where: {
                    id: noticeId
                },
                relations: {
                    user: true
                }
            })
        );
    }

    async deleteNotice(notice: Notice): Promise<void> {
        await this.noticeRepository.remove(await this.noticeMapper.toEntity(notice));
    }

    async queryAllNotices(): Promise<NoticeResponse[]> {
        const notices = await this.noticeRepository.find({
            relations: {
                user: true
            }
        });

        return Promise.all(
            notices.map(async (notice) => await this.noticeMapper.toDomain(notice))
        );
    }
}
