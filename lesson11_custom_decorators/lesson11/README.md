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

# PHẦN 11: TẠO CÁC DECORATOR TÙY CHỈNH

## 1. Decorator là gì?

- Decorator là một hàm nhận vào một hàm khác và trả về một hàm mới.
- Decorator là một cách mạnh mẽ để thêm các metadata vào các class, method, property hoặc parameter trong TypeScript.
- Decorator có thể được sử dụng để thay đổi hành vi của các class, method, property hoặc parameter mà nó được áp dụng lên.
- Decorator có thể được sử dụng để thêm các tính năng mới vào các class, method, property hoặc parameter mà nó được áp dụng lên.

## 2. Cú pháp tạo Decorator

### 2.1. Decorator cho class

```ts
export function MyDecorator(): ClassDecorator {
  return (target: Function) => {
    // Thực hiện một số hành động với class
    console.log(`Class ${target.name} đã được tạo ra!`);
  }
}
```

- Sử dụng decorator cho class:

```ts
@MyDecorator()
export class MyClass {
  constructor() {
    console.log('MyClass đã được khởi tạo!');
  }
}
```

- Kết quả:

```ts
Class MyClass đã được tạo ra!
MyClass đã được khởi tạo!
```

- Decorator cho class nhận vào một tham số là class mà nó được áp dụng lên. Tham số này có kiểu là `Function`.

### 2.2. Decorator cho method (Sử dụng `SetMetadata`)

```ts
import { SetMetadata } from '@nestjs/common';

export const MyDecorator = (value: any) => SetMetadata('myDecorator', value);
```

VD: Tạo decorator Roles
```ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
```

### 2.3. Parameter Decorator

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MyParamDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Trả về user từ request
  },
);
```
VD: Tạo decorator `User`

```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // Trả về user từ request
  },
);
```

- Sử dụng decorator `User` trong controller:

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.decorator';
import { User as UserEntity } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@User() user: UserEntity) {
    return user; // Trả về thông tin người dùng
  }
}
```
