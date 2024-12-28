import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from 'src/app/modules/config/prisma/prisma.service';
import { format } from 'date-fns';
import { SqsWrapper } from 'src/app/infra/aws';

@Injectable()
export class RecordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sqsWrapper: SqsWrapper,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const { courtId, data, isDone } = createRecordDto;

    const record = await this.prisma.record.create({
      data: {
        courtId,
        data,
        isDone,
        url: createRecordDto.url,
        awsKey: createRecordDto.key,
      },
    });

    return record;
  }

  async createAndSendToQueue(createRecordDto: CreateRecordDto) {
    const { courtId, data } = createRecordDto;

    const record = await this.prisma.record.create({
      data: {
        courtId,
        data,
      },
    });

    try {
      const startTimestamp = new Date(data);
      const endTimestamp = new Date(startTimestamp.getTime() + 30 * 1000);

      const formattedStartTimestamp = format(
        new Date(startTimestamp),
        "yyyy-MM-dd'%'HH:mm:ss",
      );

      const formattedEndTimestamp = format(
        new Date(endTimestamp),
        "yyyy-MM-dd'%'HH:mm:ss",
      );

      const device = await this.prisma.court.findUnique({
        where: { id: courtId },
      });

      const params = {
        QueueUrl: process.env.AWS_QUEUE_URL_PROCESS,
        MessageBody: {
          court: device.id,
          camera: device.camera,
          start_timestamp: formattedStartTimestamp,
          end_timestamp: formattedEndTimestamp,
          device: device.url,
        },
      };

      await this.sqsWrapper.sendMessage(params.MessageBody, params.QueueUrl);

      console.log('Mensagem enviada com sucesso');
    } catch (err) {
      console.error('Erro ao enviar a mensagem para a fila SQS:', err.message);
    }

    return record;
  }

  async findAll() {
    return await this.prisma.record.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.record.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    const { courtId, data, isDone } = updateRecordDto;

    const updatedRecord = await this.prisma.record.update({
      where: { id },
      data: {
        courtId,
        data,
        isDone,
      },
    });

    return updatedRecord;
  }

  async remove(id: number) {
    return await this.prisma.record.delete({
      where: { id },
    });
  }
}
