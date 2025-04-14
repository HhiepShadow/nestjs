import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async addEmailJob(data: any) {
    await this.emailQueue.add('sendEmail', data, {
      delay: 5000,
    });
  }
}
