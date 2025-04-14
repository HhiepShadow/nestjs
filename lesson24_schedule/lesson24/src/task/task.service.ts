import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug("Cron job every 10 seconds");
  }

  @Interval(5000)
  handleInterval() {
    this.logger.debug('Job every 5 seconds');
  }

  @Timeout(15000)
  handleTimeout() {
    this.logger.debug('Job after 15 seconds (1 time)');
  }
}