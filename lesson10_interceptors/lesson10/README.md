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

# PHẦN 10: INTERCEPTORS

- Interceptor là một khái niệm mạnh mẽ trong NestJS
- Cho phép ta can thiệp vào quá trình xử lý request/response của ứng dụng
- Có thể sử dụng để thực hiện các tác vụ:
  - Ghi log
  - Biến đổi dữ liệu trả về
  - Xử lý lỗi
  - Thêm logic trước/sau khi controller xử lý request
  - Cache response
  - Timeout request

## 1. Tạo Interceptor

- Tạo 1 class mới được đánh dấu `@Injectable()` và implement interface `NestInterceptor`

- Phương thức `intercept()` sẽ nhận vào 2 tham số:
  - `context`: chứa thông tin về request và response
  - `next`: là một hàm gọi tiếp theo trong chuỗi xử lý request/response
- Phương thức `intercept()` sẽ trả về một Observable hoặc Promise, cho phép ta thực hiện các tác vụ bất đồng bộ trước khi trả về response cho client

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> {
    // Logic trước khi controller xử lý request
    console.log('Before...');

    return next.handle().pipe(
      // Logic sau khi controller xử lý request
      tap(() => console.log('After...')),
    );
  }
}
```

## 2. Sử dụng Interceptor
- Có thể sử dụng Interceptor ở nhiều cấp độ khác nhau trong ứng dụng NestJS:
  - Toàn cục (Global)
  - Theo module (Module-scoped)
  - Theo controller (Controller-scoped)
  - Theo route handler (Route handler-scoped)

- Để sử dụng Interceptor, ta cần đăng ký nó trong module hoặc controller mà ta muốn áp dụng

- Để đăng ký Interceptor toàn cục, ta sử dụng phương thức `app.useGlobalInterceptors()` trong file `main.ts`:

```ts
app.useGlobalInterceptors(new MyInterceptor());
```

- Để đăng ký Interceptor theo module, ta sử dụng thuộc tính `providers` trong decorator `@Module()`:

```ts
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MyInterceptor],
})
```

- Để đăng ký Interceptor theo controller, ta sử dụng decorator `@UseInterceptors()` trong class controller:

```ts
@UseInterceptors(MyInterceptor)
@Controller('app')
export class AppController {}
```

- Để đăng ký Interceptor theo route handler, ta sử dụng decorator `@UseInterceptors()` trong phương thức của controller

```ts
@UseInterceptors(MyInterceptor)
@Get()
findAll() {
  return this.appService.findAll();
}
```

## 3. Các loại Interceptor thường dùng

### 3.1. Loggin Interceptor

- Interceptor này sẽ ghi lại thông tin về request và response, bao gồm:
  - Thời gian xử lý request
  - Thông tin về request (method, url, headers, body)
  - Thông tin về response (status code, body)
- Interceptor này có thể được sử dụng để theo dõi hiệu suất của ứng dụng, phát hiện lỗi và ghi lại thông tin cho mục đích phân tích sau này

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const { method, url } = request;
        const { statusCode } = response;
        this.logger.log(
          `${method} ${url} ${statusCode} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
```

### 3.2. Error Handling Interceptor

- Interceptor này sẽ xử lý các lỗi xảy ra trong quá trình xử lý request và trả về một response phù hợp cho client
- Interceptor này có thể được sử dụng để ghi lại thông tin về lỗi, gửi thông báo cho người dùng hoặc thực hiện các tác vụ khác liên quan đến lỗi
- Interceptor này có thể được sử dụng để xử lý các lỗi không mong muốn và trả về một response phù hợp cho client

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        // Xử lý lỗi và trả về một response phù hợp
        console.error('Error occurred:', error);
        return throwError(new InternalServerErrorException('Something went wrong'));
      }),
    );
  }
}
```

### 3.3. Timeout Interceptor

- Interceptor này sẽ giới hạn thời gian xử lý request và trả về một response nếu quá thời gian quy định
- Interceptor này có thể được sử dụng để ngăn chặn các request mất quá nhiều thời gian và trả về một response phù hợp cho client

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, timeout, catchError, throwError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000), // timeout sau 3 giây
      catchError(err => throwError(() => new RequestTimeoutException())),
    );
  }
}
```

### 3.4. Cache Interceptor

- Interceptor này sẽ lưu trữ response của request và trả về response đã lưu trữ nếu request tương tự được gửi đến trong khoảng thời gian quy định
- Interceptor này có thể được sử dụng để giảm tải cho server và cải thiện hiệu suất của ứng dụng

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CacheService } from './cache.service';
import { CacheKey } from './cache-key.decorator';
import { CacheTTL } from './cache-ttl.decorator';
import { Cache } from './cache.interface';
import { CacheManager } from './cache.manager';
import { CacheStore } from './cache.store';
import { CacheStoreFactory } from './cache-store.factory';
import { CacheStoreOptions } from './cache-store-options.interface';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor(
    private readonly cacheService: CacheService,
    private readonly cacheStore: CacheStore,
    private readonly cacheManager: CacheManager,
    private readonly cacheStoreFactory: CacheStoreFactory,
    private readonly cacheStoreOptions: CacheStoreOptions,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const cacheKey = this.cacheService.getCacheKey(request);
    const cacheTTL = this.cacheService.getCacheTTL(request);

    return this.cacheStore.get(cacheKey).pipe(
      tap((cache: Cache) => {
        if (cache) {
          response.send(cache.data);
        } else {
          next.handle().pipe(
            tap((data) => {
              this.cacheStore.set(cacheKey, data, cacheTTL);
            }),
          );
        }
      }),
    );
  }
}
```

## 4. Tại sao Interceptor lại là AOP (Aspect Oriented Programming)?

- AOP là một phương pháp lập trình cho phép tách biệt các tác vụ liên quan đến xử lý request/response ra khỏi logic chính của ứng dụng
- Interceptor cho phép ta tách biệt các tác vụ liên quan đến xử lý request/response ra khỏi logic chính của ứng dụng
- Điều này giúp cho mã nguồn trở nên sạch sẽ hơn, dễ bảo trì hơn và dễ mở rộng hơn
- Interceptor cho phép ta thực hiện các tác vụ như ghi log, xử lý lỗi, cache response mà không làm thay đổi logic chính của ứng dụng

## 5. So sánh Middleware, Guard, Pipe và Interceptor

| Tiêu chí                         | Middleware                                      | Guard                                             | Interceptor                                              | Pipe                                                   |
|----------------------------------|--------------------------------------------------|---------------------------------------------------|-----------------------------------------------------------|--------------------------------------------------------|
| Thời điểm thực thi               | Trước Guard, Pipe, Controller                   | Trước Controller/Handler                         | Trước và sau Controller/Handler                          | Trước khi dữ liệu đến Controller/Handler               |
| Mục đích chính                   | Xử lý request thô (log, parse, token)           | Xác thực, phân quyền                              | Biến đổi response, log, cache, timeout, retry...         | Validate, transform dữ liệu đầu vào                    |
| Can thiệp vào Response           | Có thể, nhưng hạn chế                           | Không                                             | Có thể biến đổi/format dữ liệu trả về                    | Không (chỉ xử lý request)                              |
| Dùng cho xác thực/phân quyền    | Không khuyến khích                              | Chính xác                                         | Không phù hợp                                              | Không phù hợp                                          |
| Biến đổi dữ liệu đầu vào        | Không                                          | Không                                           | Không (trừ khi wrap controller)                           | Chính: transform & validate input                      |
| Biến đổi dữ liệu đầu ra         | Không                                          | Không                                           | Có (transform response)                                   | Không                                                  |
| Có access đến Request           | Có (`req`, `res`, `next`)                        | Có (`ExecutionContext`)                            | Có (`ExecutionContext`, `CallHandler`)                     | Có (`value`, `metadata`)                               |
| Xử lý async                      | Có thể                                           | Có thể                                            | Rất phù hợp với RxJS                                      | Có thể (hỗ trợ Promise/Observable)                    |
| Áp dụng ở đâu                    | App level (`app.use(...)`)                       | Controller, Method, hoặc Global                   | Controller, Method, hoặc Global                           | Controller, Method, Param                              |
| Phù hợp xử lý việc gì?           | Logging, CORS, gắn `req.user`, parse body       | Role check, quyền truy cập                        | Logging nâng cao, timeout, định dạng response, cache     | Validate input, chuyển đổi kiểu dữ liệu                |
| Tính chất                        | Không đồng bộ (async)                           | Đồng bộ                                          | Có thể đồng bộ hoặc không đồng bộ                          | Đồng bộ hoặc không đồng bộ                             |
