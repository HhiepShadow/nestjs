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

# PHẦN 26 - LOGGING

- Logging là quá trình ghi lại thông tin, sự kiện, lỗi, cảnh báo, v.v. trong quá trình ứng dụng hoạt động

### 1. Các cấp độ log - Log levels

| Level | Khái niệm | Cách đối ứng | Ví dụ |
|--|--|--|--|
| `FATAL` | Gây cản trở đến việc vận hành của hệ thống | Cần sửa ngay | Không thể kết nối tới Database |
| `ERROR` | Việc thực thi gây ra những lỗi ngoài dự tính | Sửa trong thời gian hoạt động của hệ thống | Không thể gửi email |
| `WARN` | Không phải lỗi nhưng là những vấn đề như input không như mong muốn hay thực thi không như mong muốn | Refactor định kỳ | API xóa dữ liệu một cách định kỳ |
| `INFO` | Thông tin khi bắt đầu hoặc kết nối 1 xử lý, transaction, cũng có thể là đưa ra các thông tin cần thiết khác | Không cần sửa | Đưa ra nội dung của request/response, hoặc khi bắt đầu hoặc kết thúc batch |
| `DEBUG` | Thông tin liên quan đến trạng thái hoạt động của hệ thống | Không đưa ra ở môi trường production | Có thể đặt ở các hàm bên trong ứng dụng |
| `TRACE` - `VERBOSE` | Thông tin chi tiết ở mức độ cao hơn DEBUG | Không đưa ra ở môi trường production | |

