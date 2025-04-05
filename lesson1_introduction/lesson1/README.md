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

# PHẦN 1: GIỚI THIỆU VỀ NESTJS:
## 1. NestJS là gì?
- NestJS là 1 framework phát triển ứng dụng Nodejs được xây dựng dựa trên Typescript, hỗ trợ tổ chức mã nguồn theo kiến trúc module
- Mục đích là cung cấp 1 giải pháp mạnh mẽ để xây dựng các ứng dụng server-side:
  - Hỗ trợ Typescript tích hợp sẵn
  - Modular Architecture
  - Sử dụng decorator và các nguyên lý như DI 
  - Hỗ trợ các công nghệ phổ biến như REST API, GraphQL, WebSockets, Microservices
  - Dễ mở rộng và bảo trì
- Lợi ích:
  - Hỗ trợ mạnh mẽ Typescript nhưng vẫn tương thích với Javascript
  - Dựa trên các nguyên lý từ __Angular__ (decorator, dependency injection)
  - Tích hợp sẵn các công nghệ phổ biến
  - Dễ dàng mở rộng và tích hợp với các công nghệ phổ biến như TypeORM, Mongoose, GraphQL, WebSockets

## 2. Kiến trúc của NestJS:
- NestJS dựa trên các nguyên tắc từ Angular để xây dựng 1 kiến trúc linh hoạt, bao gồm:  
(1) __Modules__: Chia ứng dụng thành các module nhỏ để quản lý  
(2) __Controllers__: Nhận và xử lý các request từ client  
(3) __Services__: Chứa các logic nghiệp vụ chính  
(4) __Providers__: Sử dụng để quản lý các dependency  
(5) __Decorators__: Định nghĩa và điều chỉnh hành vi của mã  

## 3. Cài đặt và triển khai:  
### 3.1. Cài đặt NestJS CLI: 
- NestJS CLI là công cụ chính để tạo và quản lý dự án NestJS 
- Để cài đặt, sử dụng lệnh:  
```bash
npm i -g @nestjs/cli
```

- Kiểm tra cài đặt thành công:  
```bash
nest --version
```

### 3.2. Tạo 1 dự án mới:  
- Dùng Nest CLI để tạo dự án mới:  
```bash
nest new <project-name>
```

### 3.3. Cấu trúc dự án:  
```
my-nest-project/
├── src/
│   ├── app.controller.ts      # Controller chính
│   ├── app.controller.spec.ts # File test cho controller
│   ├── app.module.ts          # Module chính
│   ├── app.service.ts         # Service chính
│   ├── main.ts                # Điểm khởi động ứng dụng
├── test/                      # Thư mục chứa các tệp test
├── package.json               # Quản lý dependencies
├── tsconfig.json              # Cấu hình TypeScript
└── .prettierrc                # Cấu hình Prettier
```

### 3.4. Chạy ứng dụng: 
```bash
cd my-nest-project
npm run start
```

### 3.5. Các chế độ chạy ứng dụng: 
- NestJS cung cấp nhiều chế độ chạy khác nhau  
- Chế độ phát triển: Tự động reload khi có thay đổi trong mã nguồn
```bash 
npm run start:dev
```

- Chế độ sản xuất: Build và chạy mã đã được tối ưu hóa  
```bash
npm run start:prod
```

### 3.6. Config file __.env__:
- Để quản lý các biến môi trường, ta có thể cài đặt và sử dụng @nestjs/config:
```bash
npm i @nestjs/config
```

- Thêm vào module chính (__app.module.ts__):

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class AppModule {}
```

- Tạo file `.env`:
```env
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
```

## Chú ý: Nếu dự án NestJS hiển thị lỗi `Delete `␍`eslint prettier/prettier`:
- Vào file `.eslintrc.js`
- Thêm vào phần `rules`:
```js
"prettier/prettier": [
  "error",
  {
    "endOfLine": "auto"
  },
],
```
