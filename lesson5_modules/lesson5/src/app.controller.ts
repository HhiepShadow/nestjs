import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: LoggerService,
  ) {
    this.logger.log('AppController initialized');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
