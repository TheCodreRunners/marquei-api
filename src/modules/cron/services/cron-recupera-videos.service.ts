import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EVERY_40_SECONDS, EVERY_5_SECONDS } from 'src/common/enum/EnumCron';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { SqsWrapper } from 'src/infra/aws';

@Injectable()
export class CronRecoverVideosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sqsWrapper: SqsWrapper,
  ) {}

  @Cron(EVERY_5_SECONDS, { name: 'GET_PROCESSED_VIDEOS' })
  public async getProcessedVideos(): Promise<void> {
    console.log('getProcessedVideos');
    try {
      const IsCronActive = this.prisma.cronControl.findFirst({
        where: {
          name: 'GET_PROCESSED_VIDEOS',
        },
      });

      if (!IsCronActive) return;
      const queuedVideos = await this.sqsWrapper.receiveMessage(
        process.env.AWS_QUEUE_URL_SAVE_VIDEO,
      );
      console.log('aa', queuedVideos);
      if (!queuedVideos) return;

      for (const video of queuedVideos) {
        const { camera, data, url, key } = video;

        const court = await this.prisma.court.findUnique({
          where: { id: Number(camera) },
        });

        await this.prisma.record.create({
          data: {
            courtId: court.id,
            data,
            url,
            awsKey: key,
          },
        });

        await this.sqsWrapper.deleteMessage(
          process.env.AWS_QUEUE_URL_SAVE_VIDEO,
          video.receiptHandle,
        );
      }
    } catch (error) {
      console.error('Error on getProcessedVideos', error);
    }
  }
}
