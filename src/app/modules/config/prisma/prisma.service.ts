import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (params.model === 'user') {
        if (params.action === 'create' || params.action === 'update') {
          const user = params.args.data;
          if (user.password) {
            const saltRounds = 10;
            user.password = bcrypt.hashSync(user.password, saltRounds);
          }
        }
      }
      return next(params);
    });
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
