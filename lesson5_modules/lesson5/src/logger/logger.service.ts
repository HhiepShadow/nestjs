import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor(@Inject('LOGGER_OPTIONS') private readonly options: any) {}

  log(message: string) {
    if (this.options.isEnabled && this.options.level === 'log') {
      console.log('[LOG]', message);
    }
  }

  warn(message: string) {
    if (this.options.isEnabled && this.options.level === 'warn') {
      console.warn('[WARN]', message);
    }
  }

  error(message: string) {
    if (this.options.isEnabled && this.options.level === 'error') {
      console.error('[ERROR]', message);
    }
  }
}
