import { Inject, Injectable } from '@nestjs/common';
import { UploadImagePort } from '../spi/image.spi';
import { UploadImageResponse } from '../dto/image.dto';

@Injectable()
export class UploadImageUseCase {
    constructor(
        @Inject(UploadImagePort)
        private readonly uploadImagePort: UploadImagePort
    ) {}

    async execute(fileName: string, buffer: Buffer): Promise<UploadImageResponse> {
        await this.uploadImagePort.uploadImage(fileName, buffer);

        return {
            url: this.uploadImagePort.getImageUrl(fileName)
        };
    }
}
