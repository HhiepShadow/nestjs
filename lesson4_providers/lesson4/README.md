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

# PHẦN 4: PROVIDERS

- Provider là 1 khái niệm cơ bản và chúng là thành phần quan trọng trong DI
- Provider trong NestJS là bất kỳ lớp, giá trị, factory hay service nào có thể được inject vào các thành phần khác 
- Provider giúp ta xây dựng mối quan hệ giữa các đối tượng 1 cách linh hoạt và module hóa
- Thay vì tự tạo tay các đối tượng, NestJS có thể quản lý việc tạo và quản lý các dependency thông qua DI
## 1. Các khái niệm chính:
### 1.1. Provider dưới dạng lớp - Class Provider:  
- Loại provider phổ biến nhất là lớp được đánh dấu với `@Injectable()` 
- Khi ta đánh dấu 1 lớp `@Injectable()`, lớp đó trở thành 1 provider và có thể được inject vào các lớp khác  
__VD__:
```ts
@Injectable()
export class MyService {
  getHello(): string {
    return "Hello, World";
  }
}
```

### 1.2. Dependency Injection - DI:
- NestJS sử dụng DI để inject các instance của providers vào các lớp khác
- Giúp ta tách biệt các thành phần với nhau, tăng cường khả năng duy trì và kiểm thử 
- Thay vì phải tạo 1 instance của service hay lớp, NestJS sẽ cung cấp instance đó 1 cách tự động khi cần  
__VD__:
```ts
@Controller("hello")
export class HelloController {
  constructor(private readonly myService: MyService) {}

  @Get()
  getHello(): string {
    return this.myService.getHello();
  }
}
```

### 1.3. Providers có thể là:
- __Services__: Loại provider phổ biến nhất
- __Repositories__: Thường được sử dụng trong ngữ cảnh truy cập dữ liệu hoặc cơ sở dữ liệu
- __Factories__: Các provider được tạo ra thông qua 1 hàm factory
- __Helpers/Utility Classes__: Bất kỳ lớp tiện ích hay helper nào cung cấp các chức năng chung

### 1.4. Các loại Provider:
(1) Class Provider:
- Provider nơi lớp được sử dụng trực tiếp để tạo đối tượng  
__VD__:
```ts
// users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = ['Alice', 'Bob'];

  getAllUsers(): string[] {
    return this.users;
  }
}

// users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAllUsers();
  }
}
```

(2) Value Provider:

- Value Provider là những giá trị đơn giản như object, string, number có thể được cung cấp dưới dạng provider
- Là 1 cách để cung cấp các giá trị tĩnh hoặc cấu hình cho ứng dụng  

__VD__:

```ts
// config.ts
export const config = {
  apikey: '12345',
  apiUrl: 'https://api.example.com',
};

// app.module.ts
import { Module } from '@nestjs/common';
import { config } from './config';

@Module({
  providers: [
    {
      provide: 'CONFIG',
      useValue: config,
    },
  ],
})
export class AppModule {}
```

- Sử dụng:

```ts
@Injectable()
export class AppService {
  constructor(@Inject('CONFIG') private config: any) {}

  getConfig() {
    return this.config;
  }
}
```

(3) Factory Provider:

- Factory Providers là những provider được tạo ra thông qua 1 hàm factory
- Ta có thể sử dụng factory để tạo các giá trị hoặc instance phức tạp  

__VD__:

```ts
// app.module.ts
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: 'API_CONFIG',
      useFactory: () => {
        return {
          apiKey: '12345',
          apiUrl: 'https://api.example.com',
        };
      },
    },
  ],
})
export class AppModule {}
```

- Sử dụng:

```ts
@Injectable()
export class AppService {
  constructor(@Inject('API_CONFIG') private config: any) {}

  getConfig() {
    return this.config;
  }
}
```

- Factory Provider cho phép ta inject các dependency khác vào hàm factory thông qua `inject` property

(4) Async Provider:

- Async Provider là các provider mà giá trị của chúng được lấy thông qua các hàm bất đồng bộ (asynchronous)
- Hữu dụng khi ta cần lấy các giá trị từ 1 API hoặc 1 nguồn dữ liệu nào đó bất đồng bộ  

__VD__:

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: 'CONFIG',
      useFactory: async (configService: ConfigService) => {
        const config = await configService.loadConfig();
        return config;
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
```

(5) Existing Provider:

- Existing Provider cho phép ta sử dụng 1 
provider đã tồn tại như là 1 dependency khác
- Hữu dụng khi ta muốn cung cấp interface nhưng sử dụng 1 implementation cụ thể
- Để sử dụng, ta chỉ cần chỉ định provider đã tồn tại trong `useExisting` property

__VD__:

```ts
// my.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class MyService {
  getHello(): string {
    return 'Hello from MyService';
  }
}

// my.module.ts
import { Module } from '@nestjs/common';
import { MyService } from './my.service';

@Module({
  providers: [
    MyService,
    {
      provide: 'MyExistingService',
      useExisting: MyService, // Sử dụng MyService như là 1 existing provider
    }
  ]
})
export class MyModule {}
```

- Sử dụng:

```ts
@Injectable()
export class AppService {
  constructor(@Inject('MyExistingService') private myService: MyService) {}

  getHello(): string {
    return this.myService.getHello();
  }
}
```

(6) Custom Provider:

- Cho phép ta định nghĩa các provider tùy chỉnh, trong đó ta có thể chỉ định tên của provider và cách thức nó hoạt động  

__VD__:

```ts
// custom.provider.ts
export const MyCustomProvider = {
  provide: 'MY_CUSTOM_PROVIDER',
  useValue: 'This is a custom provider',
};

// app.module.ts
import { Module } from '@nestjs/common';
import { MyCustomProvider } from './custom.provider';

@Module({
  providers: [MyCustomProvider],
})
export class AppModule {}

```