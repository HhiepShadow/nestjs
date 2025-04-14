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

# PHẦN 15 - EXECUTION CONTEXT

- `ExecutionContext` là 1 interface đặc biệt mở rộng từ `ArgumentsHost`
- Được sử dụng để lấy thông tin về request, response, và các thông tin khác liên quan đến request hiện tại tại runtime trong:
  - Guards
  - Interceptors
  - Pipes
  - Exception filters
  - Custom Decorators

- Nó hoạt động như 1 lớp trừu tượng cho phép bạn truy cập vào các thông tin này mà không cần phải biết trước về loại request hay response cụ thể mà bạn đang làm việc với.

## Các phương thức của `ExecutionContext`

| Hàm / Phương thức                     | Cú pháp sử dụng                                                 | Mô tả ngắn gọn |
|--------------------------------------|------------------------------------------------------------------|----------------|
| `getClass()`                         | `context.getClass()`                                            | Lấy class (controller) hiện tại |
| `getHandler()`                       | `context.getHandler()`                                          | Lấy method đang được gọi |
| `getType()`                          | `context.getType()`                                             | Trả về loại context: `'http'`, `'rpc'`, `'ws'` |
| `switchToHttp()`                     | `const http = context.switchToHttp()`                           | Chuyển sang context HTTP |
| `switchToRpc()`                      | `const rpc = context.switchToRpc()`                             | Chuyển sang context RPC (microservice) |
| `switchToWs()`                       | `const ws = context.switchToWs()`                               | Chuyển sang context WebSocket |
| `getArgs()`                          | `context.getArgs()`                                             | Lấy toàn bộ arguments truyền vào |
| `getArgByIndex(index: number)`       | `context.getArgByIndex(0)`                                      | Lấy argument theo chỉ số |
| `switchToHttp().getRequest()`        | `context.switchToHttp().getRequest()`                           | Lấy object request (req) của HTTP |
| `switchToHttp().getResponse()`       | `context.switchToHttp().getResponse()`                          | Lấy object response (res) của HTTP |
| `switchToHttp().getNext()`           | `context.switchToHttp().getNext()`                              | Lấy next function (nếu có) |
| `switchToRpc().getContext()`         | `context.switchToRpc().getContext()`                            | Lấy context RPC |
| `switchToRpc().getData()`            | `context.switchToRpc().getData()`                               | Lấy payload dữ liệu RPC |
| `switchToWs().getClient()`           | `context.switchToWs().getClient()`                              | Lấy WebSocket client |
| `switchToWs().getData()`             | `context.switchToWs().getData()`                                | Lấy dữ liệu socket gửi lên |
| `switchToWs().getArgs()`             | `context.switchToWs().getArgs()`                                | Lấy toàn bộ argument từ WebSocket |
| `switchToWs().getDataByIndex(index: number)` | `context.switchToWs().getDataByIndex(0)`                      | Lấy argument theo chỉ số từ WebSocket |
| `switchToWs().getDataByPattern(pattern: string)` | `context.switchToWs().getDataByPattern('pattern')` | Lấy argument theo pattern từ WebSocket |

## Sử dụng `ExecutionContext` với Adapters khác

### 1. GraphQL

- `@nestjs/graphql` là 1 adapter cho phép bạn sử dụng GraphQL với NestJS

```ts
import { GqlExecutionContext } from '@nestjs/graphql';

const ctx = GqlExecutionContext.create(context);
const request = ctx.getContext().req; // Lấy request từ context
```

### 2. RPC (Microservices)

- `@nestjs/microservices` là 1 adapter cho phép bạn sử dụng microservices với NestJS

```ts
import { MicroserviceExecutionContext } from '@nestjs/microservices';

const ctx = MicroserviceExecutionContext.create(context);
const data = ctx.getData(); // Lấy dữ liệu từ context
const pattern = ctx.getPattern(); // Lấy pattern từ context
```


