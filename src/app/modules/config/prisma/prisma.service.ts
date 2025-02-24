import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if ((params.model as string) === 'User') {
        if (params.action === 'create' || params.action === 'update') {
          const user = params.args.data;

          if (user.password) {
            const saltRounds = 10;
            console.log('user.password', user.password);
            user.password = await bcrypt.hashSync(user.password, saltRounds);
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
