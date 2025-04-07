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

# PHẦN 13 - CIRCULAR DEPENDENCY

## 1. Circular Dependency là gì?

- 1 vòng lặp phụ thuộc xảy ra khi 2 hoặc nhiều module phụ thuộc lẫn nhau. Điều này có thể dẫn đến lỗi trong ứng dụng của bạn, vì Nest không thể xác định thứ tự khởi tạo các module.
- Ví dụ: Module A phụ thuộc vào Module B, và Module B cũng phụ thuộc vào Module A. Điều này tạo ra một vòng lặp mà không thể giải quyết được.
- Circular Dependency có thể xảy ra trong bất kỳ ngôn ngữ lập trình nào, nhưng trong NestJS, nó thường xảy ra khi bạn sử dụng Dependency Injection để quản lý các module và service.

## 2. Forward Reference

- Forward Reference là một kỹ thuật trong NestJS cho phép bạn giải quyết vấn đề Circular Dependency bằng cách sử dụng `forwardRef()`.
- Khi bạn sử dụng `forwardRef()`, bạn có thể chỉ định rằng một module hoặc service sẽ được khởi tạo sau khi tất cả các module và service khác đã được khởi tạo. Điều này giúp tránh vòng lặp phụ thuộc và cho phép bạn sử dụng Circular Dependency một cách an toàn.

__Ví dụ:__ Giả sử ta có 2 service hoặc module phụ thuộc lẫn nhau như sau:

- `AuthService` phụ thuộc vào `UserService` để xác thực người dùng
- `UserService` phụ thuộc vào `AuthService` để xác thực token

- Điều này tạo ra vòng lặp phụ thuộc giữa 2 service. Để giải quyết vấn đề này, ta có thể sử dụng `forwardRef()`:

```typescript
// auth.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  // Các phương thức khác của AuthService
}

// user.service.ts
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  // Các phương thức khác của UserService
}

// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { UserModule } from './user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

// user.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
```

