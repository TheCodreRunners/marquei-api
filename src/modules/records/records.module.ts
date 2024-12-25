import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { SqsWrapper } from 'src/infra/aws';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, SqsWrapper],
})
export class RecordsModule {}
