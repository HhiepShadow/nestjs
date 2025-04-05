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

# PIPES - TRANSFORMATIONS

## 1. PIPES

- Pipes trong NestJS là 1 cơ chế dùng để:
  - Chuyển đổi dữ liệu đầu vào (Data Transformation)
  - Xác thực dữ liệu (Validation)
  - Lọc dữ liệu đầu vào (Sanitization)
- Pipe là 1 lớp annotation sử dụng với `@Injectable()` decorator giúp triển khai interface `PipeTransform`

- Pipes có thể được sử dụng ở mức global, controller, hoặc route handler

### 1.1. Các loại Pipes

- NestJS cung cấp 2 loại pipes:
  - Built-in Pipes: Được NestJS cung cấp sẵn
  - Custom Pipes: Tự tạo để xử lý logic đặc biệt

### 1.2. Các loại Built-in Pipes

| Pipe | Mô tả | Ví dụ |
|--|--|--|
| `ValidationPipe` | Xác thực dữ liệu DTO dựa trên class validator | `@UsePipes(new ValidationPipe())` |
| `ParseIntPipe` | Chuyển đổi giá trị thành `number` | `@Params('id', ParseIntPipe) id: number` |
| `ParseFloatPipe` | Chuyển đổi giá trị thành `float` | `@Query('price', ParseFloatPipe) price: number` |
| `ParseBoolPipe` | Chuyển đổi giá trị thành `boolean` | `@Query('active', ParseBoolPipe) active: boolean` |
| `ParseUUIDPipe` | Kiểm tra giá trị có phải UUID hợp lệ không | `@Param('uuid', ParseUUIDPipe) uuid: string` |
| `DefaultValuePipe` | Gán giá trị mặc định nếu giá trị bị `undefined` | `@Query('limit', new DefaultValuePipe(10)) limit: number` |
| `TrimPipe` | Loại bỏ khoảng trắng đầu cuối chuỗi | Custom Pipe |

## 2. Custom Pipes

- Custom Pipe cho phép ta xử lý và xác thực dữ liệu đầu vào trước khi đến Controller

- Cú pháp:

```ts
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValid(value)) {
      throw new BadRequestException(`Validation failed: ${value} is not valid`);
    }

    return value;
  }

  private isValid(value: any): boolean {
    return typeof value === 'string' && value.length > 0;
  }
}
```

trong đó:
- `PipeTransform`: là interface mà các pipe cần phải triển khai
- `transform(value: any, metadata: ArgumentMetadata)`: Hàm chính để xử lý dữ liệu đầu vào
- `ArgumentMetadata`: Chứa metadata về tham số 

## 3. ArgumentMetadata

- `ArgumentMetadata` là 1 interface của NestJS cung cấp thông tin về tham số mà Pipe đang xử lý
- Cấu trúc của `ArgumentMetadata`:

```ts
export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<any>;
  data?: string;
}
```