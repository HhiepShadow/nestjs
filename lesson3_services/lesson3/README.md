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

# PHẦN 3: SERVICES

- Services là các thành phần dùng để xử lý logic nghiệp vụ (business logic)
- Chúng tách biệt các tác vụ phức tạp khỏi Controller, duy trì sự gọn gàng và dễ bảo trì cho ứng dụng

## 1. Các khái niệm quan trọng:
### 1.1. `@Injectable()`:
- Là 1 decorator đánh dấu 1 class là service có thể được inject vào các thành phần khác như Controllers, Modules hoặc Services
- Các Service thường được sử dụng để truy xuất, xử lý, và trả về dữ liệu từ database hoặc các nguồn khác

### 1.2. Dependency Injection - DI:
- NestJS sử dụng DI để quản lý việc cung cấp các dependencies cho các service
- Giúp việc code dễ dàng mở rộng và kiểm thử

### 1.3. Phạm vi (Scope):
- Mặc định, Service là Singleton, tức chỉ có 1 instance được tạo ra cho toàn bộ ứng dụng  
- Có thể thay đổi phạm vi của Service thành __Request__ hoặc __Transient__ khi cần:
  - __Request__: 1 instance của service sẽ được tạo mới cho mỗi request đến
  - __Transient__: 1 instance riêng biệt sẽ tạo cho mỗi lần inject vào 1 thành phần

## 2. Các Decorator:
| Decorator | Mục đích | Cú pháp | Ví dụ |
|--|--|--|--|
| `@Injectable()` | Đánh dấu class là 1 service có thể được inject vào các thành phần khác | `@Injectable(options?: { scope?: Scope })` | ```ts \n@Injectable() \nexport class UsersService {}``` |
| `@Inject` | Inject 1 provider cụ thể vào 1 thành phần khác | `@Inject(token: string)` | |
| `@Optional()` | Đánh dấu 1 dependency là tùy chọn (không bắt buộc) | `@Optional()` | |
| `@Scope` | Đặt phạm vi của provider | `@Scope(scope: Scope)` | |

## 3. Tạo Service:
- Sử dụng CLI để tạo service:  
```bash
nest g service <service-name>
```

__VD__:
```bash
nest g service users
```
&rarr; Tạo ra file `users.service.ts`:  

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = [];

  findAll(): string[] {
    return this.users;
  }

  create(user: string): void {
    this.users.push(user);
  }
}
```

- Inject Service vào Controller:  
```ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() user: string) {
    this.usersService.create(user);
  }
}
```

- Đăng ký dịch vụ vào module `app.module.ts`:
```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
```