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

# PHẦN 6: MIDDLEWARE

- Middleware là 1 hàm trung gian được thực thi trước khi yêu cầu HTTP đến route handler
- Middleware hữu ích khi ta muốn thêm logic xử lý chung, như kiểm tra xác thực, ghi log, hay thay đổi dữ liệu yêu cầu  

## 1. Đặc điểm:
- Middleware chỉ hoạt động với các route của ứng dụng  
- Có thể áp dụng cho toàn bộ ứng dụng, 1 module cụ thể, hay 1 route cụ thể
- Middleware có quyền truy cập vào đối tượng `Request`, `Response` và phương thức `next()` của `express`

## 2. Triển khai Middleware:  
__VD__: Ta sẽ triển khai 1 Middleware logging để mỗi khi gọi api sẽ ghi log 

(1) Tạo Middleware: 
- Middleware được định nghĩa bằng 1 lớp hoặc 1 hàm
- Lớp này phải implements interface `NestMiddleware`
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[Request] ${req.method} - ${req.url}`);
    next();
  }
}
```

(2) Sử dụng Middleware:
- Ta có thể sử dụng middleware thông qua hàm `configure()` trong 1 module:  
```ts
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("users");
  }
}
```

(3) Áp dụng Middleware cho toàn bộ ứng dụng:
```ts
import { LoggerMiddleware } from './logger.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
```

(4) Áp dụng cho route cụ thể:
```ts
consumer
  .apply(LoggerMiddleware)
  .forRoutes({ path: 'users', method: RequestMethod.GET });
```

## 3. Async/Await Middleware:
- Middleware có thể xử lý các logic bất đồng bộ như truy vấn cơ sở dữ liệu:
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AsyncMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const data = await someAsyncFunction();
    console.log(data);
    next();
  }
}
```

## 4. Middleware dạng hàm:
- Ta có thể sử dụng các hàm thay vì lớp để làm middleware:

```ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`[Request] ${req.method} - ${req.url}`);
  next();
}

// Sử dụng trong AppModule
import { Module, MiddlewareConsumer } from '@nestjs/common';

@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes('*');
  }
}
```

## 5. Chuỗi Middleware:
- Ta có thể áp dụng nhiều middleware cho cùng 1 route bằng cách truyền vào nhiều middleware trong `apply`  
__VD__:
```ts
consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes(UsersController);
```