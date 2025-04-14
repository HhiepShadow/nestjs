import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('email')
  async sendEmail(
    @Body() body: { to: string; subject: string; content: string },
  ) {
    return this.queueService.addEmailJob(body);
  }
}
