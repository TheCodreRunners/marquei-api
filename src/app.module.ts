import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './modules/client/client.module';
import { CourtModule } from './court/court.module';

@Module({
  imports: [ClientModule, CourtModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
