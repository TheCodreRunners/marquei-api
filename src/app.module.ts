import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { CourtModule } from './court/court.module';
import { RecordsModule } from './modules/records/records.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { CronModule } from './modules/cron/cron.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt.guard';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ClientModule,
    CourtModule,
    RecordsModule,
    PrismaModule,
    CronModule,
    AuthModule,
    JwtModule,
    ScheduleModule.forRoot(),
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
