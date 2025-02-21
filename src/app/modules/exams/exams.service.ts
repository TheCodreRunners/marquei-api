import { Injectable } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExamDto: CreateExamDto) {
    return this.prisma.exams.create({
      data: createExamDto,
    });
  }

  findAll() {
    return this.prisma.exams.findMany();
  }

  findOne(id: number) {
    return this.prisma.exams.findUnique({
      where: { id },
    });
  }

  update(id: number, updateExamDto: UpdateExamDto) {
    return this.prisma.exams.update({
      where: { id },
      data: updateExamDto,
    });
  }

  remove(id: number) {
    return this.prisma.exams.delete({
      where: { id },
    });
  }
}
