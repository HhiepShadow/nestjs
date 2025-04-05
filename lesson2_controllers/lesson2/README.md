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

# PHẦN 2: CONTROLLERS

## 1. Controllers là gì?
- Controller chịu trách nhiệm xử lý HTTP Request và trả về HTTP Response
- Là nơi định nghĩa các endpoint của API
- Nhiệm vụ:
  - Nhận request từ client
  - Gọi đến các service để xử lý logic
  - Trả về dữ liệu hoặc phản hồi thích hợp  

## 2. Tạo 1 Controller:
- NestJS CLI hỗ trợ tạo controller nhanh chóng:
```bash
nest generate controller <controller-name>
```

__VD__:
```bash
nest g controller users
```

&rarr; Tạo ra file `users.controller.ts` trong `src/users`:
```ts
import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}
```

## 3. Cấu trúc cơ bản của Controller:
- 1 Controller bao gồm:
  - __Decorators__: Dùng để định nghĩa endpoint và phương thức HTTP 
  - __Methods__: Xử lý từng loại request  
__VD__:
```ts

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

@Controller('users') // Định nghĩa route gốc là /users
export class UsersController {
  @Get() // GET /users
  findAll(): string {
    return 'This action returns all users';
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string): string {
    return `This action returns user #${id}`;
  }

  @Post() // POST /users
  create(@Body() createUserDto: any): string {
    return 'This action creates a new user';
  }

  @Put(':id') // PUT /users/:id
  update(@Param('id') id: string, @Body() updateUserDto: any): string {
    return `This action updates user #${id}`;
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: string): string {
    return `This action removes user #${id}`;
  }
}
```

## 4. Danh sách các Decorator:

| __Decorator__       | __Mục đích__                                                                 | __Cú pháp__                                  | __Ví dụ__                                                                                                                        |
|----------------------|------------------------------------------------------------------------------|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `@Controller()`      | Định nghĩa một class là Controller và chỉ định route gốc.                   | `@Controller(route?: string)`                | ```typescript \n@Controller('users') \nexport class UsersController {}```                                                      |
| `@Get()`             | Xử lý HTTP GET request.                                                     | `@Get(route?: string)`                        | ```typescript \n@Get() \ngetAllUsers(): string { return 'Get all users'; }```                                                  |
| `@Post()`            | Xử lý HTTP POST request.                                                    | `@Post(route?: string)`                       | ```typescript \n@Post() \ncreateUser(): string { return 'User created'; }```                                                   |
| `@Put()`             | Xử lý HTTP PUT request (cập nhật dữ liệu).                                  | `@Put(route?: string)`                        | ```typescript \n@Put(':id') \nupdateUser(@Param('id') id: string): string { return `Update user with ID ${id}`; }```           |
| `@Delete()`          | Xử lý HTTP DELETE request (xóa dữ liệu).                                    | `@Delete(route?: string)`                     | ```typescript \n@Delete(':id') \ndeleteUser(@Param('id') id: string): string { return `Delete user with ID ${id}`; }```        |
| `@Patch()`           | Xử lý HTTP PATCH request (cập nhật một phần dữ liệu).                       | `@Patch(route?: string)`                      | ```typescript \n@Patch(':id') \nupdatePartial(@Param('id') id: string): string { return `Partially update user with ID ${id}`; }``` |
| `@Param()`           | Lấy giá trị tham số từ URL.                                                 | `@Param(paramName?: string)`                  | ```typescript \n@Get(':id') \ngetUser(@Param('id') id: string): string { return `User ID: ${id}`; }```                        |
| `@Body()`            | Lấy dữ liệu từ body của request.                                            | `@Body(paramName?: string)`                   | ```typescript \n@Post() \ncreateUser(@Body() dto: CreateUserDto): string { return dto.name; }```                               |
| `@Query()`           | Lấy dữ liệu từ query string trong URL.                                      | `@Query(paramName?: string)`                  | ```typescript \n@Get() \nfindUsers(@Query('name') name: string): string { return `Find user: ${name}`; }```                    |
| `@Headers()`         | Lấy dữ liệu từ headers của request.                                         | `@Headers(headerName?: string)`               | ```typescript \n@Get() \ngetHeader(@Headers('authorization') auth: string): string { return auth; }```                        |
| `@Req()`             | Lấy toàn bộ object request.                                                 | `@Req()`                                      | ```typescript \n@Get() \ngetRequest(@Req() req): string { return req.method; }```                                             |
| `@Res()`             | Lấy toàn bộ object response.                                                | `@Res()`                                      | ```typescript \n@Get() \nsendResponse(@Res() res): void { res.status(200).send('OK'); }```                                    |
| `@HttpCode()`        | Đặt mã trạng thái HTTP cho response.                                        | `@HttpCode(statusCode: number)`               | ```typescript \n@Post() \n@HttpCode(204) \ncreate(): void { return; }```                                                      |
| `@Header()`          | Thêm header vào response.                                                   | `@Header(name: string, value: string)`        | ```typescript \n@Get() \n@Header('Cache-Control', 'none') \nnoCache(): string { return 'No cache'; }```                       |
| `@Redirect()`        | Chuyển hướng đến URL khác.                                                  | `@Redirect(url: string, statusCode?: number)` | ```typescript \n@Get('docs') \n@Redirect('https://docs.nestjs.com') \ngetDocs() {}```                                         |
| `@UseGuards()`       | Áp dụng guard để bảo vệ route.                                              | `@UseGuards(...guards: Type[])`               | ```typescript \n@Get() \n@UseGuards(AuthGuard) \ngetProtectedData() { return 'Protected'; }```                                |
| `@UseInterceptors()` | Áp dụng interceptor cho route.                                              | `@UseInterceptors(...interceptors: Type[])`   | ```typescript \n@Get() \n@UseInterceptors(ClassSerializerInterceptor) \ngetData() { return {}; }```                           |
| `@UsePipes()`        | Áp dụng pipe để xử lý hoặc validate dữ liệu.                                | `@UsePipes(...pipes: PipeTransform[])`        | ```typescript \n@Post() \n@UsePipes(ValidationPipe) \ncreate(@Body() dto: CreateUserDto) {}```                                |
| `@UseFilters()`      | Áp dụng filter để xử lý ngoại lệ.                                           | `@UseFilters(...filters: ExceptionFilter[])`  | ```typescript \n@Get() \n@UseFilters(HttpExceptionFilter) \nthrowError() { throw new HttpException('Error', 400); }```        |
| `@Version()`         | Định nghĩa phiên bản API cho route.                                         | `@Version(version: string)`                   | ```typescript \n@Controller({ path: 'users', version: '1' }) \nexport class UsersController {}```                             |
