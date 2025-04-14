import {
  BeforeApplicationShutdown,
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class MyService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('Module initialized');
  }

  onApplicationBootstrap() {
    console.log('Application bootstrap completed');
  }

  afterApplicationBootstrap() {
    console.log('All modules bootstrapped');
  }

  onModuleDestroy() {
    console.log('Module destroyed');
  }

  beforeApplicationShutdown(signal: string) {
    console.log(`App is shutting down... [Before] Signal: ${signal}`);
  }

  onApplicationShutdown(signal: string) {
    console.log(`App shutdown completed. Signal: ${signal}`);
  }
}
