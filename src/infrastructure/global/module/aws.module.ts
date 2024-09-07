import { Global, Module } from '@nestjs/common';
import { UploadImagePort } from '../../../application/domain/image/spi/image.spi';
import { S3Adapter } from '../../thirdparty/s3/s3.adapter';

const S3_PORT = { provide: UploadImagePort, useClass: S3Adapter };

@Global()
@Module({
    providers: [S3_PORT],
    exports: [S3_PORT]
})
export class AwsModule {}
