export interface UploadImagePort {
    uploadImage(fileName: string, buffer: Buffer): Promise<void>;

    getImageUrl(fileName: string): string;
}

export const UploadImagePort = Symbol('IUploadImagePort');
