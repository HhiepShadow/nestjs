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

# PHẦN 14 - LAZY LOADING MODULES

## 1. Lazy Loading Modules

- Lazy loading là một kỹ thuật tối ưu hóa hiệu suất trong đó các module hoặc tài nguyên không được tải cho đến khi chúng thực sự cần thiết. Điều này giúp giảm thời gian tải ban đầu của ứng dụng và tiết kiệm băng thông.
- Trong NestJS, lazy loading modules cho phép bạn chỉ tải các module khi chúng được yêu cầu, thay vì tải tất cả các module ngay từ đầu. Điều này có thể hữu ích trong các ứng dụng lớn với nhiều module không cần thiết phải tải ngay lập tức.
- Để sử dụng lazy loading trong NestJS, bạn có thể sử dụng `dynamic modules`. Dynamic modules cho phép bạn tạo các module với cấu hình tùy chỉnh và chỉ tải chúng khi cần thiết.
- Bạn có thể sử dụng `import()` để tải module một cách động khi cần thiết. Điều này giúp giảm thời gian tải ban đầu của ứng dụng và tiết kiệm băng thông.
- Lazy loading modules có thể giúp cải thiện hiệu suất của ứng dụng, đặc biệt là trong các ứng dụng lớn với nhiều module không cần thiết phải tải ngay lập tức.

## 2. Cách sử dụng Lazy Loading Modules trong NestJS

- Để sử dụng lazy loading modules trong NestJS, bạn có thể làm theo các bước sau:

1. Tạo một module mới mà bạn muốn lazy load.
2. Sử dụng `dynamic module` để tạo module với cấu hình tùy chỉnh.

## 3. Ví dụ

Giả sử ta có ứng dụng quản lý nhân sự với các module sau:
- `EmployeeModule`: Quản lý nhân viên
- `ShiftModule`: Quản lý ca làm việc
- `ReportModule`: Quản lý báo cáo

- Ta sẽ tạo `ReportModule` là một module lazy load, chỉ tải khi người dùng yêu cầu tạo báo cáo.

```ts
// report.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {
  static register(): DynamicModule {
    return {
      module: ReportModule,
      providers: [ReportService],
      exports: [ReportService],
    };
  }
}

// app.module.ts
import { Module } from '@nestjs/common';

@Module({
  imports: [], // Không cần import eager module như trước
})
export class AppModule {}

// app.controller.ts
import { Controller, Get, Module } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('load-report-module')
  async loadReportModule() {
    const { ReportModule } = await import('./report/report.module');
    // Có thể thực hiện logic sau khi module được tải, ví dụ gọi service hoặc khởi tạo
    return 'ReportModule loaded!';
  }
}
```

**Trong thực tế**:
- Hệ thống quản lý nhân sự:
  - `ShiftModule` chỉ được tải khi quản lý cần xem thông tin ca làm việc.
  - `PayrollModule` chỉ được tải khi quản lý cần xem thông tin lương.

- Ứng dụng thương mại điện tử:
  - `ProductModule` chỉ được tải khi người dùng cần xem danh sách sản phẩm.
  - `OrderModule` chỉ được tải khi người dùng cần xem thông tin đơn hàng.
  - `CartModule` chỉ được tải khi người dùng cần xem giỏ hàng.
