import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const emailQueue = app.get<Queue>(getQueueToken('email'));

  const { addQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter,
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
