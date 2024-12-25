import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { CronRecoverVideosService } from './services/cron-recupera-videos.service';
import { SqsWrapper } from 'src/infra/aws';

@Module({
  controllers: [CronController],
  providers: [CronService, CronRecoverVideosService, SqsWrapper],
})
export class CronModule {}
