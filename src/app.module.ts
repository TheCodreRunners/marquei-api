import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './app/modules/client/client.module';

import { PrismaModule } from './app/modules/config/prisma/prisma.module';
import { CronModule } from './app/modules/cron/cron.module';
import { AuthModule } from './app/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './app/auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ExamsModule } from './app/modules/exams/exams.module';

@Module({
  imports: [
    ClientModule,
    PrismaModule,
    CronModule,
    AuthModule,
    JwtModule,
    ScheduleModule.forRoot(),
    ExamsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
