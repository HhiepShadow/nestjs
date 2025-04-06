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

# GUARDS

## 1. Định nghĩa

- Guards trong NestJS được sử dụng để kiểm soát quyền truy cập vào các API router
- Giúp xác thực người dùng trước khi xử lý request trong Controller
- Guards thường được sử dụng để bảo vệ API bằng cách:
  - Kiểm tra token
  - Quyền truy cập (Role - Authorization)
  - Xác thực người dùng (Authentication)
- Guard là 1 lớp được đánh dấu `@Injectable()` và triển khai interface `CanActivate`

## 2. So sánh

- Guards có nhiệm vụ duy nhất là quyết định xem 1 request có được xử lý bởi route handler hay không
- Guards kiểm tra điều kiện tại thời điểm runtime:
  - Quyền hạn (Permission)
  - Vai trò (Roles)
  - Danh sách kiểm soát truy cập (ACLs)
&rarr; Quá trình này được gọi là phân quyền (Authorization)

- So sánh Guards và Middleware:

| Tiêu chí | Middleware | Guards |
|--|--|--|
| Mục đích | Xử lý authentication (xác thực) như kiểm tra token, thêm user vào request | Xử lý authorization như kiểm tra role, quyền hạn |
| Khi nào chạy? | Trước khi request đến Controller, không biết route nào sẽ xử lý | Trước khi Controller thực thi, biết chính xác handler nào sẽ chạy |
| Truy cập `ExecutionContext` | Không | Có |
| Dùng `next()` | Có `next()` được gọi để tiếp tục middleware tiếp theo | Không dùng `next()`, trả về `true/false` để quyết định request |
| Áp dụng ở đâu | Tất cả request, không phụ thuộc vào route cụ thể | Áp dụng cho các route cụ thể |
| Tính linh hoạt | Kém hơn, không request sẽ đi đâu | Cao hơn, có thể truy cập metadata của route |

&rarr; Kết luận:

  - Middleware phù hợp cho xác thực (Authentication)
  - Guards phù hợp cho phân quyền (Authorization)

### Vì sao nên sử dụng Guards thay vì Middleware cho Authorization?

- __Middleware__ không biết request sẽ đi đâu sau khi gọi hàm `next()`, nên không thể kiểm tra quyền dựa trên thông tin route
- __Guards__ có thể truy cập vào `ExecutionContext`, nghĩa là nó biết route nào sẽ được gọi và có thể kiểm tra quyền truy cập 1 cách chính xác
- __Guards__ giống như __ExceptionFilters__, __Pipes__, và __Interceptors__, giúp code DRY hơn và dễ bảo trì hơn

## 3. ExecutionContext

- `ExecutionContext` là 1 đối tượng chứa toàn bộ thông tin về request hiện tại
- Giúp ta có thể truy cập vào thông tin của request, response, handler, metadata, và nhiều thông tin quan trọng khác
- Cấu trúc:

```ts
interface ExecutionContext extends ArgumentHost {
  switchToHttp(): HttpArgumentHost;
  switchToWs(): WsArgumentHost;
  switchToRpc(): RpcArgumentHost;
  getClass<T = any>(): Type<T>;
  getHandler(): Function;
}
```

## 4. Cách sử dụng Guards

### 4.1 Tạo Guard

- Có 2 cách để tạo Guard:
  - Tạo thủ công
  - Sử dụng CLI của NestJS

- Cách 1: Tạo thủ công: Tạo 1 lớp Guard được đánh dấu `@Injectable()` và triển khai interface `CanActivate`

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    // Kiểm tra token hoặc thông tin xác thực khác
    return true; // Hoặc false nếu không hợp lệ
  }
}
```

- Cách 2: Sử dụng CLI của NestJS để tạo Guard tự động:

```bash
nest g guard auth
```
&rarr; Kết quả sẽ tạo ra 1 file `auth.guard.ts` trong thư mục `src/auth` với nội dung như sau:

```ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

### 4.2 Sử dụng Guard trong Controller

- Ta có thể sử dụng Guard trong Controller bằng cách sử dụng decorator `@UseGuards()` và truyền vào Guard mà ta đã tạo ở trên
- Ta có thể áp dụng Guard ở nhiều cấp độ khác nhau:
  - Trên toàn bộ Controller
  - Trên từng route handler cụ thể
  - Kết hợp nhiều Guard với nhau

- TH1: Sử dụng Guard trên toàn bộ Controller:

```ts
@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  @Get('login')
  login() {
    return 'Login';
  }

  @Get('register')
  register() {
    return 'Register';
  }
}
```

- TH2: Sử dụng Guard trên từng route handler cụ thể:

```ts
@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard)
  login() {
    return 'Login';
  }

  @Get('register')
  register() {
    return 'Register';
  }
}
```

- TH3: Kết hợp nhiều Guard với nhau:

```ts
@Controller('auth')
@UseGuards(AuthGuard, RoleGuard)
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard, RoleGuard)
  login() {
    return 'Login';
  }

  @Get('register')
  register() {
    return 'Register';
  }
}
```

- TH4: Sử dụng Global Guards:
  - Cú pháp:

  ```ts 
  app.useGlobalGuards(new AuthGuard());
  ```

## 5. Build-in Guards

- NestJS cung cấp 1 số Guards có sẵn để sử dụng, bao gồm:
  - `AuthGuard`: Xác thực người dùng bằng JWT hoặc Passport
  - `RolesGuard`: Kiểm tra quyền truy cập dựa trên vai trò (Role)
  - `ThrottlerGuard`: Giới hạn số lượng request từ 1 IP trong 1 khoảng thời gian nhất định (Rate Limiting)
  - `WsGuard`: Xác thực người dùng trong WebSocket

- Ví dụ sử dụng `AuthGuard`:

```ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractToken(request: Request): string | null {
    // Logic trích xuất token từ header
  }
}
```
