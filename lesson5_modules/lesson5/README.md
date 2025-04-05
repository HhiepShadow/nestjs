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

## 1. Khái niệm:
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

## 3. Các thành phần chính của Module:  
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