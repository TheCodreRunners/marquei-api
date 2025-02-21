import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { SqsWrapper } from 'src/app/infra/aws';

@Module({
  controllers: [CronController],
  providers: [CronService, SqsWrapper],
})
export class CronModule {}
