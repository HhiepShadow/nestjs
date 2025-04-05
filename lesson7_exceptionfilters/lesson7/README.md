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

# PHẦN 7: EXCEPTION FILTER

- Exception Filter là 1 tính năng mạnh mẽ trong NestJS để xử lý các ngoại lệ (exception) xảy ra trong quá trình thực thi ứng dụng 
- Thay vì để các ngoại lệ lan truyền lên client mà không kiểm soát, __Exception Filter__ cho phép ta tùy chỉnh phản hồi trả về, ghi log, hoặc thực hiện các hành động khác khi xảy ra ngoại lệ

## 1. Built-in Exception:
- NestJS tự động xử lý các ngoại lệ được ném ra bằng các lớp ngoại lệ tích hợp sẵn 
### 1.1. Lớp `HttpException`:
- Là lớp cơ sở được sử dụng để ném ra các ngoại lệ mới mã trạng thái HTTP và thông báo tùy chỉnh
- Tất cả các built-in exception đều kế thừa từ lớp này
- Cú pháp:
```ts
constructor(
  response: string | Record<string, any>,
  status: number
)
```

__VD__:
```ts
import { HttpException, HttpStatus, Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  throwException() {
    throw new HttpException("Custom error message", HttpStatus.BAD_REQUEST);
  }
}
```

&rarr; Response:
```json
{
  "statusCode": 403,
  "message": "This is a custom exception"
}
```

- Ném ngoại lệ với đối tượng JSON:
```ts
import { HttpException, HttpStatus, Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  throwException() {
    throw new HttpException(
      { error: 'Bad Request', message: 'Invalid input data' },
      HttpStatus.BAD_REQUEST,
    );
  }
}
```

- Các thuộc tính của HttpException:

| Thuộc tính | Mô tả |
|--|--|
| `getResponse()` | Trả về phản hồi được cung cấp trong constructor |
| `getStatus()` | Trả về mã trạng thái HTTP được cung cấp trong constructor |

### 1.2. Built-in Exceptions:


| Exception Class                  | HTTP Status | Syntax                                     | Description                                                            | Example                                                                 |
|----------------------------------|-------------|--------------------------------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------|
| `BadRequestException`            | 400         | `new BadRequestException(message?: any)`   | Dữ liệu yêu cầu không hợp lệ hoặc sai định dạng.                        | `throw new BadRequestException('Invalid input data');`                 |
| `UnauthorizedException`          | 401         | `new UnauthorizedException(message?: any)` | Không có quyền truy cập vì không xác thực.                             | `throw new UnauthorizedException('Invalid credentials');`              |
| `PaymentRequiredException`       | 402         | `new PaymentRequiredException(message?: any)` | Thanh toán cần thiết để truy cập tài nguyên.                           | `throw new PaymentRequiredException('Payment is required');`           |
| `ForbiddenException`             | 403         | `new ForbiddenException(message?: any)`    | Không có quyền truy cập mặc dù đã xác thực thành công.                 | `throw new ForbiddenException('Access denied');`                       |
| `NotFoundException`              | 404         | `new NotFoundException(message?: any)`     | Tài nguyên được yêu cầu không tồn tại.                                 | `throw new NotFoundException('Resource not found');`                   |
| `MethodNotAllowedException`      | 405         | `new MethodNotAllowedException(message?: any)` | HTTP method không được hỗ trợ cho endpoint này.                        | `throw new MethodNotAllowedException('HTTP method not allowed');`      |
| `NotAcceptableException`         | 406         | `new NotAcceptableException(message?: any)` | Server không thể tạo phản hồi với định dạng yêu cầu.                   | `throw new NotAcceptableException('Content not acceptable');`          |
| `RequestTimeoutException`        | 408         | `new RequestTimeoutException(message?: any)` | Yêu cầu đã vượt quá thời gian chờ của server.                          | `throw new RequestTimeoutException('Request timed out');`              |
| `ConflictException`              | 409         | `new ConflictException(message?: any)`     | Có xung đột dữ liệu, chẳng hạn như trùng lặp tài nguyên.               | `throw new ConflictException('Data conflict detected');`               |
| `GoneException`                  | 410         | `new GoneException(message?: any)`         | Tài nguyên đã bị xóa và không còn khả dụng.                            | `throw new GoneException('Resource is no longer available');`          |
| `PayloadTooLargeException`       | 413         | `new PayloadTooLargeException(message?: any)` | Payload trong yêu cầu vượt quá kích thước cho phép.                   | `throw new PayloadTooLargeException('Payload exceeds limit');`         |
| `UnsupportedMediaTypeException`  | 415         | `new UnsupportedMediaTypeException(message?: any)` | Loại media trong yêu cầu không được hỗ trợ.                            | `throw new UnsupportedMediaTypeException('Unsupported media type');`   |
| `UnprocessableEntityException`   | 422         | `new UnprocessableEntityException(message?: any)` | Dữ liệu yêu cầu đúng định dạng nhưng không hợp lệ theo ngữ nghĩa.      | `throw new UnprocessableEntityException('Invalid entity data');`       |
| `InternalServerErrorException`   | 500         | `new InternalServerErrorException(message?: any)` | Lỗi máy chủ không xác định hoặc không mong muốn.                       | `throw new InternalServerErrorException('Unexpected server error');`   |
| `NotImplementedException`        | 501         | `new NotImplementedException(message?: any)` | Tính năng chưa được triển khai hoặc hỗ trợ.                            | `throw new NotImplementedException('Feature not implemented');`        |
| `BadGatewayException`            | 502         | `new BadGatewayException(message?: any)`   | Server nhận được phản hồi không hợp lệ từ gateway.                     | `throw new BadGatewayException('Invalid response from gateway');`      |
| `ServiceUnavailableException`    | 503         | `new ServiceUnavailableException(message?: any)` | Server không khả dụng tạm thời do bảo trì hoặc quá tải.                | `throw new ServiceUnavailableException('Service is unavailable');`     |
| `GatewayTimeoutException`        | 504         | `new GatewayTimeoutException(message?: any)` | Gateway không phản hồi trong thời gian yêu cầu.                        | `throw new GatewayTimeoutException('Gateway timed out');`              |

## 2. Custom Exception:
- Tạo lớp ngoại lệ tùy chỉnh bằng cách kế thừa `HttpException`
```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor() {
    super('This is a custom exception', HttpStatus.FORBIDDEN);
  }
}
```

## 3. Exception Filter:
- Exception Filter là 1 cơ chế để xử lý các ngoại lệ
- Thay vì để framework xử lý tự động các lỗi, ta có thể định nghĩa các quy tắc xử lý cụ thể bằng cách sử dụng Exception Filter

### 3.1. Các loại Filter:
  - Global Filters: Áp dụng cho toàn bộ ứng dụng
  - Scoped Filters: Áp dụng cho 1 controller hoặc 1 route cụ thể
  - Custom Filters: Tự định nghĩa cách xử lý các loại exception cụ thể

### 3.2. Tạo Exception Filter:
- NestJS cung cấp 1 interface `ExceptionFilter` để tạo custom filter
- Cú pháp:
```ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
    });
  }
}
```

### 3.3. Áp dụng Exception Filter:
(1) Global Filter:
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); 
  await app.listen(3000);
}
bootstrap();
```

(2) Scoped Filter:
- Sử dụng cho Controller:
```ts
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller('example')
@UseFilters(HttpExceptionFilter) // Áp dụng cho tất cả route trong controller
export class ExampleController {
  @Get()
  test() {
    throw new HttpException('Forbidden', 403);
  }
}
```

- Cho 1 Route cụ thể:
```ts
@Get('specific')
@UseFilters(HttpExceptionFilter)
specificRoute() {
  throw new HttpException('Route-specific error', 400);
}
```

### 3.4. Built-in Decorator:
`@Catch(exceptionType?: Type<any> | Type<any>[])`: Dùng để chỉ định loại exception mà filter sẽ xử lý

## 4. Custom Filter cho Custom Exception:
- Nếu ta có 1 exception tùy chỉnh, ta có thể tạo filter xử lý riêng
```ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { CustomException } from './exceptions/custom.exception';

export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
```

- Sử dụng filter: 
```ts
@UseFilters(CustomExceptionFilter)
```
