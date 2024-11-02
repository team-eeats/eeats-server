import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

@Injectable()
export class FirebaseConfig implements OnModuleInit {
    private readonly s3Client: S3Client;
    private readonly localFilePath: string;

    constructor(private readonly configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET'),
            },
        });
        this.localFilePath = path.join(__dirname, 'firebase-adminsdk.json');
    }

    async onModuleInit() {
        await this.initialize();
    }

    async initialize() {
        if (admin.apps.length === 0) {
            await this.downloadFirebaseConfig();
            const serviceAccount = require(this.localFilePath);

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        }
    }

    private async downloadFirebaseConfig() {
        const bucketName = this.configService.get<string>('AWS_S3_BUCKET');
        const s3Key = this.configService.get<string>('FCM_PATH');

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: s3Key,
        });

        const response = await this.s3Client.send(command);
        const writeStream = fs.createWriteStream(this.localFilePath);

        if (response.Body) {
            await streamPipeline(response.Body as NodeJS.ReadableStream, writeStream);
        } else {
            throw new Error('download failed');
        }
    }
}
