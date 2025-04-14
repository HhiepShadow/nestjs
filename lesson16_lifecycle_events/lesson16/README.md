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

# PHẦN 16 - CÁC SỰ KIỆN VÒNG ĐỜI CỦA COMPONENTS

## 1. Giới thiệu về vòng đời của components

<img src="../../assets/lesson16/lifecycle-events.png" alt="Lifecycle Events" width="600"/>

- Vòng đời của components là một chuỗi các sự kiện mà một component trải qua từ khi được tạo ra cho đến khi bị hủy bỏ.
- NestJS cho phép ta gắn các sự kiện vòng đời (lifecycle events) vào các components để thực hiện các hành động cụ thể tại các thời điểm khác nhau trong vòng đời của component.

## 2. Các sự kiện vòng đời của components

| Interface                        | Phương thức cần implement           | Mô tả ngắn gọn                                                  |
|----------------------------------|-------------------------------------|------------------------------------------------------------------|
| `OnModuleInit`                   | `onModuleInit()`                    | Gọi khi provider/module được khởi tạo                           |
| `OnApplicationBootstrap`         | `onApplicationBootstrap()`         | Gọi khi toàn bộ ứng dụng đã bootstrap xong                      |
| `AfterApplicationBootstrap`      | `afterApplicationBootstrap()`      | Gọi sau khi toàn bộ app đã bootstrap xong                       |
| `OnModuleDestroy`                | `onModuleDestroy()`                | Gọi khi module/provider bị destroy                              |
| `BeforeApplicationShutdown`      | `beforeApplicationShutdown(signal)`| Gọi trước khi app shutdown (cleanup trước khi đóng app)         |
| `OnApplicationShutdown`          | `onApplicationShutdown(signal)`    | Gọi khi app đang shutdown (có thể xử lý đóng DB, clear cache...)|

## 3. Ví dụ về các sự kiện vòng đời của components

```ts
import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  AfterApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';

@Injectable()
export class MyService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    AfterApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('Module initialized');
  }

  onApplicationBootstrap() {
    console.log('Application bootstrap completed');
  }

  afterApplicationBootstrap() {
    console.log('All modules bootstrapped');
  }

  onModuleDestroy() {
    console.log('Module destroyed');
  }

  beforeApplicationShutdown(signal: string) {
    console.log(`App is shutting down... [Before] Signal: ${signal}`);
  }

  onApplicationShutdown(signal: string) {
    console.log(`App shutdown completed. Signal: ${signal}`);
  }
}
```
