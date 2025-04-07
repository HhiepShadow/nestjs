import { DynamicModule, Module } from '@nestjs/common';
import { ILoggerOptions } from './logger.interface';
import { LoggerService } from './logger.service';

@Module({})
export class LoggerModule {
  static forRoot(options: ILoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        LoggerService,
        {
          provide: 'LOGGER_OPTIONS',
          useValue: options,
        },
      ],
      exports: [LoggerService],
    };
  }
}
