import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  SendMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
} from '@aws-sdk/client-sqs';

export class SqsWrapper {
  private readonly s3: S3Client;
  private readonly sqs: SQSClient;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.sqs = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendMessage(message: string, queueUrl: string) {
    try {
      await this.sqs.send(
        new SendMessageCommand({
          QueueUrl: queueUrl,
          MessageBody: message,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async receiveMessage(queueUrl: string) {
    try {
      const data = await this.sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: queueUrl,
        }),
      );
      return data.Messages;
    } catch (error) {
      console.error(error);
    }
  }

  async uploadFile(file: any, bucket: string, key: string) {
    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async deleteFile(bucket: string, key: string) {
    try {
      await this.s3.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }
}
