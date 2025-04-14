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

# PHẦN 19 - CẤU HÌNH

## 1. Cấu hình 

- Configuration trong Nestjs là một phần quan trọng giúp ta dễ dàng quản lý các dependency trong ứng dụng phụ thuộc vào môi trường khác nhau (development, production, testing...)

- Nestjs cung cấp cho ta module `@nestjs/config` giúp ta dễ dàng quản lý các biến môi trường trong ứng dụng

- Đây là package được Nestjs cung cấp chính thức để làm việc với file `.env` với các giá trị cấu hình trong ứng dụng

```bash
yarn add @nestjs/config dotenv
```

__Chú ý__:`@nestjs` yêu cầu Typescript >= 4.1

## 2. Cách cấu hình

- Đầu tiên, ta cần tạo file `.env` trong thư mục gốc của ứng dụng với nội dung như sau:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASS=secret
```

__Chú ý__: Ta có thể tạo nhiều file `.env` cho từng môi trường:
  - `.env.development`
  - `.env.production`
  - `.env.testing`
  - `.env.local`

- Tiếp theo, ta cần tạo 1 Module Configuration trong ứng dụng, thường là `app.module.ts` với cú pháp như sau:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()]
})
export class AppModule {}
```

- Cuối cùng, ta có thể sử dụng các biến môi trường trong ứng dụng bằng cách inject `ConfigService` vào các service hoặc controller như sau:

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT');
  }
}
```

- Load nhiều file config riêng biệt:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import dbConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // không cần import lại ở module con
      load: [appConfig, dbConfig], // load từ các file config riêng
    }),
  ],
})
export class AppModule {}

// config/app.config.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
});

// config/database.config.ts
export default () => ({
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
```

## 3. Cú pháp của ConfigModule

```ts
ConfigModule.forRoot(options?: ConfigModuleOptions): DynamicModule
```

```ts
interface ConfigModuleOptions {
  /**
   * Có muốn `ConfigModule` là global không (có thể dùng ở mọi module khác mà không cần import lại)
   */
  isGlobal?: boolean;

  /**
   * Đường dẫn đến file `.env` (hoặc mảng đường dẫn) chứa các biến môi trường
   */
  envFilePath?: string | string[];

  /**
   * Có muốn load biến môi trường từ file `.env` không (nếu false thì chỉ dùng biến hệ thống)
   */
  ignoreEnvFile?: boolean;

  /**
   * Có muốn bỏ qua biến môi trường của hệ thống không (chỉ dùng file .env)
   */
  ignoreEnvVars?: boolean;

  /**
   * Cung cấp hàm validate các biến môi trường bằng thư viện như Joi
   */
  validationSchema?: Joi.Schema;

  /**
   * Tùy chọn cho Joi validation
   */
  validationOptions?: Joi.ValidationOptions;

  /**
   * Cho phép thêm các biến môi trường mặc định nếu không có
   */
  load?: Array<ConfigFactory>;

  /**
   * Gán các biến cấu hình vào key cụ thể trong ConfigService
   */
  expandVariables?: boolean;

  /**
   * Thay đổi cache (mặc định true)
   */
  cache?: boolean;
}
```

__VD__:

```ts
ConfigModule.forRoot({
  isGlobal: true, // Dùng ConfigService ở bất kỳ module nào mà không cần import lại
  envFilePath: ['.env.development.local', '.env'], // Danh sách file env sẽ được load theo thứ tự ưu tiên
  ignoreEnvFile: false, // Nếu true thì sẽ không load file .env
  ignoreEnvVars: false, // Nếu true thì sẽ không lấy biến môi trường từ process.env
  validationSchema: Joi.object({ // Kiểm tra hợp lệ các biến môi trường
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
  }),
  validationOptions: {
    allowUnknown: true, // Cho phép biến môi trường không định nghĩa trong schema
    abortEarly: false,  // Trả về tất cả lỗi cùng lúc thay vì lỗi đầu tiên
  },
  load: [() => ({
    customValue: 'abc',
    nested: {
      value: 123,
    },
  })], // Cách để tự định nghĩa các giá trị cấu hình riêng
  expandVariables: true, // Cho phép sử dụng biến nội suy ví dụ VAR=${OTHER_VAR}
  cache: true, // Cache kết quả cấu hình, dùng cho hiệu suất
});

```

## 4. Cú pháp của ConfigService

- `get<T>(key: string, defaultValue?: T): T` - Lấy giá trị của biến môi trường với key tương ứng, nếu không có thì trả về giá trị mặc định (nếu có)
- `getOrThrow(key: string): string` - Lấy giá trị của biến môi trường với key tương ứng, nếu không có thì ném ra lỗi
- `getKeys(): string[]` - Lấy danh sách các key của biến môi trường đã load
- `getValues(): Record<string, any>` - Lấy danh sách các giá trị của biến môi trường đã load

