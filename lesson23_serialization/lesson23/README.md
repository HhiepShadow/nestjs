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

# PHẦN 23 - SERIALIZATION

## 1. Giới thiệu về Serialization

- Serialization là quá trình chuyển đổi dữ liệu từ class entity hoặc object thành định dạng có thể lưu trữ hoặc truyền tải, thường là JSON.
- Mục tiêu chính là ẩn các thông tin nhạy cảm và định dạng lại dữ liệu phản hồi một cách sạch sẽ, có kiểm soát

## 2. Cách hoạt động

- Nestjs sử dụng thư viện `class-transformer` để thực hiện serialization.
- Có 3 annotation để xử lý serialization:
  - `@Expose()`: Chỉ định trường nào được phép trả về
  - `@Exclude()`: Chỉ định trường nào không được phép trả về
  - `@Transform()`: Chuyển đổi giá trị của trường trước khi trả về

## 3. Ví dụ

- Cài đặt thư viện `class-transformer` và `class-validator`:

```bash
yarn add class-transformer class-validator
```

- Tạo 1 DTO với Serialization:

```ts
import { Expose, Exclude, Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserDTO {
  @IsString()
  @Expose()
  name: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @Exclude() // Không trả về trường này
  password: string;

  @Transform(({ value }) => value.toUpperCase()) // Chuyển đổi giá trị thành chữ hoa
  @Expose()
  role: string;
}
```

- Kích hoạt `ClassSerializerInterceptor`:

__(1) Sử dụng toàn cục trong `main.ts`__:

```ts
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
```

__(2) Sử dụng trong controller__:

```ts
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return new UserDTO({
      id: 1,
      username: 'john',
      email: 'john@example.com',
      password: 'secret',
    });
  }
}
```