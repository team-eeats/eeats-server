import { Controller, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageUseCase } from '../../../../application/domain/image/usecase/upload-image.usecase';
import { UploadImageResponse } from '../../../../application/domain/image/dto/image.dto';

@Controller('/images')
export class ImageWebAdapter {
    constructor(
        private readonly uploadImageUseCase: UploadImageUseCase
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe()
    ) image: Express.Multer.File): Promise<UploadImageResponse> {
        return await this.uploadImageUseCase.execute(image.originalname, image.buffer);
    } 
}
