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

# PHẦN 12 - INJECTION SCOPES

## 1. Giới thiệu về Injection Scopes

- Injection Scopes là một tính năng trong NestJS cho phép bạn kiểm soát vòng đời của các dependency (phụ thuộc) trong ứng dụng của bạn.
- Điều này có nghĩa là bạn có thể xác định cách mà các instance của một class được tạo ra và quản lý trong ứng dụng của bạn.
- Tức là khi nào và bao nhiêu lần Nest tạo 1 instance của provider đó trong suốt vòng đời của ứng dụng.
- Điều này rất hữu ích trong các trường hợp mà bạn cần một instance duy nhất cho toàn bộ ứng dụng (singleton), hoặc bạn muốn tạo một instance mới mỗi khi nó được yêu cầu (transient).

## 2. Các loại Injection Scopes

- NestJS hỗ trợ 3 loại Injection Scopes chính:

| Scope | Mô tả | Ví dụ | Khi nào dùng? |
|-------|-------|-------|-------|
| Singleton | Chỉ có một instance duy nhất cho toàn bộ ứng dụng. | `@Injectable({ scope: Scope.DEFAULT })` | Khi bạn muốn chia sẻ một instance giữa nhiều module hoặc controller. |
| Transient | Mỗi lần yêu cầu, một instance mới sẽ được tạo ra. | `@Injectable({ scope: Scope.TRANSIENT })` | Khi bạn muốn mỗi yêu cầu đều có một instance riêng biệt. |
| Request | Mỗi lần yêu cầu HTTP, một instance mới sẽ được tạo ra. | `@Injectable({ scope: Scope.REQUEST })` | Khi bạn muốn mỗi yêu cầu HTTP đều có một instance riêng biệt. |

## 3. Cách sử dụng Injection Scopes

- Để sử dụng Injection Scopes trong NestJS, bạn chỉ cần thêm thuộc tính `scope` vào decorator `@Injectable()` của class mà bạn muốn quản lý vòng đời.
- Ví dụ:

```ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class MyService {
  // Service logic here
}

@Injectable({ scope: Scope.TRANSIENT })
export class MyTransientService {
  // Transient service logic here
}

@Injectable({ scope: Scope.REQUEST })
export class MyRequestService {
  // Request-scoped service logic here
}
```

## 4. Ví dụ thực tế

### 4.1. Singleton Scope

- Hầu hết các service không cần trạng thái (stateless) trong ứng dụng thường được định nghĩa với scope là singleton.
- Các service như `DatabaseService`, `ConfigService` thường được định nghĩa với scope là singleton do chúng cần được chia sẻ giữa nhiều module hoặc controller trong ứng dụng.

```ts
// database.service.ts
import { Injectable, Scope } from '@nestjs/common';
@Injectable({ scope: Scope.DEFAULT })
export class DatabaseService {
  private connection: any;

  constructor() {
    this.connection = this.createConnection();
  }

  private createConnection() {
    // Logic to create a database connection
  }

  getConnection() {
    return this.connection;
  }
}

// user.controller.ts
import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('users')
export class UserController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  getUsers() {
    const connection = this.databaseService.getConnection();
    // Logic to get users from the database
  }
}
```

### 4.2. Request Scope

- Phù hợp với các tình huống mà dữ liệu hoặc trạng thái cần được gắn kết với từng request hoặc phiên làm việc cụ thể.
- Ví dụ: Các service xử lý dữ liệu người dùng trong 1 request như `AuthService`, `PaymentService` có thể được định nghĩa với scope là transient.

```ts
// auth.service.ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AuthService {
  private token: string;

  constructor() {
    this.token = this.generateToken();
  }

  private generateToken() {
    // Logic to generate a token
  }

  getToken() {
    return this.token;
  }
}

// auth.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  getToken() {
    return this.authService.getToken();
  }
}
```

### 4.3. Transient Scope

- Phù hợp với các service có trạng thái ngắn hạn hoặc được dùng tạm thời
- Ví dụ: Các service xử lý dữ liệu tạm thời như `CacheService`, `SessionService` có thể được định nghĩa với scope là request.

```ts
// cache.service.ts
import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class CacheService {
  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  set(key: string, value: any) {
    this.cache.set(key, value);
  }

  get(key: string) {
    return this.cache.get(key);
  }
}

// cache.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Get(':key')
  getCache(@Param('key') key: string) {
    return this.cacheService.get(key);
  }
}
```