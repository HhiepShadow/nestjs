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

# PHẦN 24 - TASK SCHEDULE

- Nestjs cung cấp module `@nestjs/schedule` để lập lịch chạy các tác vụ tự động theo:
  - __CRON__: theo lịch định kỳ   
  __VD__: mỗi 10s, mỗi ngày, mỗi tháng, ...

  - __Interval__: theo khoảng thời gian cố định  
  __VD__: mỗi 5s

  - __Timeout__: chạy mỗi lần sau một khoảng delay  
  __VD__: sau 3s

## 1. Sử dụng

- Cài đặt:

```bash
yarn add @nestjs/schedule
```

- Cấu hình `ScheduleModule` vào `app.module.ts`:

```ts
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
```

- Có 3 decorator chính:
  - `@Cron()`: Chạy theo biểu thức con
  - `@Interval()`: Chạy mỗi khoảng thời gian (ms)
  - `@Timeout()`: Chạy sau 1 lần delay (ms)

__VD__:

```ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.debug("Cron job every 10 seconds");
  }

  @Interval(5000)
  handleInterval() {
    this.logger.debug('Job every 5 seconds');
  }

  @Timeout(15000)
  handleTimeout() {
    this.logger.debug('Job after 15 seconds (1 time)');
  }
}
```
  
## 2. CRON 

- CRON là một biểu thức lịch cho phép định nghĩa thời điểm thực thi 1 tác vụ

- Cú pháp:
CRON expression gồm 6 phần:  
**Giây (0-59) | Phút (0-59) | Giờ (0-23) | Ngày (1-31) | Tháng (1-12) | Thứ (0-7)**  
> Lưu ý: Chủ nhật = 0 hoặc 7.

---

### 2.1. Biểu Thức Cơ Bản

| CRON               | Mô tả                     |
|--------------------|---------------------------|
| `* * * * * *`      | Mỗi giây                  |
| `*/10 * * * * *`   | Mỗi 10 giây               |
| `0 * * * * *`      | Mỗi phút                  |
| `0 */5 * * * *`    | Mỗi 5 phút                |
| `0 0 * * * *`      | Mỗi giờ                   |
| `0 0 */3 * * *`    | Mỗi 3 giờ                 |
| `0 0 0 * * *`      | Nửa đêm mỗi ngày         |

---

### 2.2. Theo Ngày, Tháng, Năm

| CRON               | Mô tả                       |
|--------------------|-----------------------------|
| `0 0 9 * * *`      | 9h sáng mỗi ngày            |
| `0 30 14 * * *`    | 14h30 mỗi ngày              |
| `0 0 1 * * *`      | 1h sáng mỗi ngày            |
| `0 0 0 1 * *`      | Nửa đêm ngày đầu tháng      |
| `0 0 0 1 1 *`      | Nửa đêm 1/1 mỗi năm         |

---

### 2.3. Theo Thứ Trong Tuần

| CRON               | Mô tả                                 |
|--------------------|----------------------------------------|
| `0 0 9 * * 1`      | 9h sáng thứ Hai                       |
| `0 0 9 * * 0`      | 9h sáng Chủ nhật                     |
| `0 0 8 * * 1-5`    | 8h sáng thứ Hai đến thứ Sáu          |
| `0 0 18 * * 5`     | 18h thứ Sáu                          |
| `0 0 12 * * 6,0`   | 12h trưa thứ Bảy và Chủ nhật         |

---

### 2.4. Bước Nhảy & Dải Giá Trị

| CRON               | Mô tả                                      |
|--------------------|---------------------------------------------|
| `0 0 0 1,15 * *`   | Nửa đêm ngày 1 và 15 hàng tháng            |
| `0 0 0 */2 * *`    | Nửa đêm mỗi 2 ngày                        |
| `0 0 0 * */3 *`    | Nửa đêm mỗi 3 tháng                       |
| `0 0 0 * 1,6,12 *` | Nửa đêm tháng 1, 6, và 12                 |

---

### 2.5. CronExpression Enum trong NestJS

NestJS cung cấp các cron phổ biến qua `CronExpression`:

```ts
import { Cron, CronExpression } from '@nestjs/schedule';

@Cron(CronExpression.EVERY_10_SECONDS)
@Cron(CronExpression.EVERY_MINUTE)
@Cron(CronExpression.EVERY_5_MINUTES)
@Cron(CronExpression.EVERY_HOUR)
@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
@Cron(CronExpression.EVERY_WEEK)
@Cron(CronExpression.EVERY_MONTH)
@Cron(CronExpression.EVERY_YEAR)
```

## 3. Các trường hợp sử dụng

- Gửi Email hoặc Notification định kỳ
- Dọn dẹp dữ liệu định kỳ như xóa log, xóa session, xóa dữ liệu rác từ người dùng
- Đồng bộ dữ liệu từ bên thứ 3
- Làm mới token hoặc cache
- Backup dữ liệu như sao lưu database hàng ngày hoặc hàng tuần, upload bản backup lên S3 hoặc Drive
- Kiểm tra hệ thống (health check) định kỳ
