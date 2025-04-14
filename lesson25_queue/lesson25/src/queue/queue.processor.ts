import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class QueueProcessor {
  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    console.log('Đang gửi email:', job.data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Email đã được gửi');
  }
}
