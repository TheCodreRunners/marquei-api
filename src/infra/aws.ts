import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  SendMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs';

export class SqsWrapper {
  private readonly s3: S3Client;
  private readonly sqs: SQSClient;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.sqs = new SQSClient({
      region: process.env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async sendMessage(message: Record<string, any>, queueUrl: string) {
    const stringifiedMessage = this.stringifyMessage(message);
    try {
      await this.sqs.send(
        new SendMessageCommand({
          QueueUrl: queueUrl,
          MessageBody: stringifiedMessage,
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
      const messages = data?.Messages;
      if (!messages) return;
      return messages?.map((message) => JSON.parse(message.Body));
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMessage(queueUrl: string, receiptHandle: string) {
    try {
      await this.sqs.send(
        new DeleteMessageCommand({
          QueueUrl: queueUrl,
          ReceiptHandle: receiptHandle,
        }),
      );
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

  private stringifyMessage(message: Record<string, any>) {
    return JSON.stringify(message);
  }
}
