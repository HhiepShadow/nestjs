import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
// import { LoggerService } from './logger/logger.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    UsersModule,
    LoggerModule.forRoot({
      isEnabled: true,
      level: 'log',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
