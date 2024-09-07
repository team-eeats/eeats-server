import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { UploadImagePort } from '../../../application/domain/image/spi/image.spi';

@Injectable()
export class S3Adapter implements UploadImagePort {
    private readonly s3Client = new S3Client({
        region: this.configService.get<string>('AWS_REGION'),
        credentials: {
            accessKeyId: this.configService.get<string>('AWS_ACCESS'),
            secretAccessKey: this.configService.get<string>('AWS_SECRET')
        }
    });

    constructor(
        private readonly configService: ConfigService
    ) {}

    async uploadImage(fileName: string, buffer: Buffer) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
                Key: fileName,
                Body: buffer,
                ACL: 'public-read'
            })
        );
    }

    getImageUrl(fileName: string): string {
        return `https://${this.configService.get('AWS_S3_BUCKET')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${fileName}`;
    }
}