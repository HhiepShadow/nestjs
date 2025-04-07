<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# PHẦN 5: MODULES

- __Modules__ là 1 thành phần trong NestJS giúp tổ chức và cấu trúc ứng dụng theo các phần có thể tái sử dụng (modular)
- Mỗi module trong NestJS đóng vai trò như 1 container để nhóm các thành phần còn lại với nhau, bao gồm controllers, providers và các thành phần khác

## 1. Khái niệm

- __Modules__ giúp ta nhóm các thành phần (component) lại với nhau để dễ dàng quản lý và tái sử dụng
- 1 ứng dụng NestJS thường có ít nhất 1 module - module gốc (`AppModule`), và từ đó ta có thể chia ứng dụng thành nhiều module con 

## 2. Cấu trúc Module trong NestJS:

- Mỗi module trong NestJS được định nghĩa bởi 1 lớp (class) với decorator `@Module()`, bao gồm:
  - `controllers`: Các controller liên quan đến module đó
  - `providers`: Các service hoặc các provider khác được sử dụng trong module
  - `imports`: Các module khác mà module hiện tại cần sử dụng
  - `exports`: Các provider mà module muốn chia sẻ cho các module khác  

__VD__:  
(1) Định nghĩa 1 Module:

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

(2) Sử dụng Module trong `AppModule`:

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```

## 3. Các thành phần chính của Module

(1) Controllers:

- `controllers` trong module giúp định nghĩa các endpoint HTTP để xử lý yêu cầu từ client
- Mỗi controller có thể chứa nhiều phương thức, mỗi phương thức xử lý 1 loại HTTP request

(2) Providers:

- `providers` bao gồm các service, repository, và các thành phần khác giúp xử lý logic nghiệp vụ hay truy xuất dữ liệu
- Các provider này có thể được inject vào các controller hoặc các provider khác  

(3) Imports:

- `imports` giúp ta import các module khác vào module hiện tại, để sử dụng các component hoặc provider từ các module đó

(4) Exports:

- `exports` giúp ta chia sẻ các provider từ module này cho các module khác, để có thể inject vào các thành phần khác trong ứng dụng

## 4. Dynamic Modules

- Dynamic Modules là các module có thể được cấu hình và tạo ra trong thời gian chạy (runtime)
- Điều này cho phép ta tạo ra các module với các tham số khác nhau, tùy thuộc vào yêu cầu của ứng dụng
- Dynamic Modules là module mà ta có thể truyền tham số cấu hình khi import vào module khác, thay vì cố định

- Để tạo ra Dynamic Module, ta cần sử dụng phương thức `forRoot()` hoặc `forRootAsync()` trong module đó
- Phương thức này sẽ trả về 1 đối tượng module với các tham số đã được cấu hình

- Cú pháp `forRoot()`:

```ts
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class MyModule {
  static forRoot(options: any): DynamicModule {
    return {
      module: MyModule,
      providers: [
        {
          provide: 'MY_OPTIONS',
          useValue: options,
        },
      ],
      exports: ['MY_OPTIONS'],
    };
  }
}
```

- Cú pháp `forRootAsync()`:

```ts
import { DynamicModule, Module } from '@nestjs/common';

@Module({})
export class MyModule {
  static forRootAsync(options: {
    useFactory: (...args: any[]) => Promise<any> | any;
    inject?: any[];
    imports?: any[];
  }): DynamicModule {
    return {
      module: MyModule,
      imports: options.imports || [],
      providers: [
        {
          provide: 'MY_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: ['MY_OPTIONS'],
    };
  }
}
```

- Khi sử dụng Dynamic Module, ta có thể truyền các tham số cấu hình vào module đó khi import vào module khác

```ts
import { Module } from '@nestjs/common';
import { MyModule } from './my.module';

@Module({
  imports: [
    MyModule.forRoot({
      apiKey: 'abc123',
      baseUrl: 'https://api.example.com',
    }),
  ],
})
export class AppModule {}
```

- Hoặc sử dụng `forRootAsync()`:

```ts
import { Module } from '@nestjs/common';
import { MyModule } from './my.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MyModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          apiKey: configService.get('API_KEY'),
          baseUrl: configService.get('BASE_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## 5. So sánh LoggerModule và LoggerInterceptor

- `LoggerModule` là 1 module giúp tích hợp hệ thống logging vào NestJS, với khả năng tùy chỉnh cấu hình (log level, format, destination, ...)

```ts
// logger.module.ts
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { LOGGER_MODULE_OPTIONS, LOGGER_TOKEN } from './logger.constants';
import { LoggerService } from './logger.service';
import { LoggerModuleOptions } from './logger.interface';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(options?: LoggerModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: LOGGER_MODULE_OPTIONS,
        useValue: options || {},
      },
      {
        provide: LOGGER_TOKEN,
        useClass: LoggerService,
      },
    ];

    return {
      module: LoggerModule,
      providers,
      exports: [LOGGER_TOKEN],
    }
  }
}

// logger.service.ts
import { Injectable, Inject, LoggerService as NestLoggerService } from '@nestjs/common';
import { LOGGER_MODULE_OPTIONS } from './logger.constants';
import { LoggerModuleOptions } from './logger.interface';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(LOGGER_MODULE_OPTIONS) private readonly options: LoggerModuleOptions,
  ) {}

  log(message: string) {
    // Implement logging logic here
    console.log(`[LOG] ${message}`);
  }

  error(message: string, trace?: string) {
    // Implement error logging logic here
    console.error(`[ERROR] ${message}`, trace);
  }

  warn(message: string) {
    // Implement warning logging logic here
    console.warn(`[WARN] ${message}`);
  }

  debug(message: string) {
    // Implement debug logging logic here
    console.debug(`[DEBUG] ${message}`);
  }

  verbose(message: string) {
    // Implement verbose logging logic here
    console.log(`[VERBOSE] ${message}`);
  }
}

// logger.interface.ts
export interface LoggerModuleOptions {
  level?: string;
  format?: string;
  destination?: string;
}

// logger.constants.ts
export const LOGGER_MODULE_OPTIONS = 'LOGGER_MODULE_OPTIONS';
export const LOGGER_TOKEN = 'LOGGER_TOKEN';

// app.module.ts
import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      level: 'info',
      format: 'json',
      destination: 'logs/app.log',
    }),
  ],
})
```

- `LoggerInterceptor` là 1 interceptor giúp ghi lại thông tin về các request và response trong ứng dụng, có thể sử dụng để ghi log hoặc thực hiện các hành động khác trước và sau khi xử lý request

```ts
// logger.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';
import { LOGGER_TOKEN } from './logger.constants';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    this.logger.log(`Incoming request: ${request.method} ${request.url}`);

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Outgoing response: ${response.statusCode}`);
      }),
    );
  }
}

// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './logger/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggerInterceptor(app.get(LOGGER_TOKEN)));
  await app.listen(3000);
}
bootstrap();

```