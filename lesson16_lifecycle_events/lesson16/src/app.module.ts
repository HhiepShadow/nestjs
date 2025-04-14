import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyService } from './my/my.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyService],
})
export class AppModule {}
