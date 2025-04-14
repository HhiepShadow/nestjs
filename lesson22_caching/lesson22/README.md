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

# PHẦN 22 - CACHING

## 1. Caching là gì?

- Cache là bộ nhớ đệm - dùng để lưu trữ tạm thời dữ liệu mà ứng dụng thường xuyên truy cập.
- Tác dụng:
  - Tăng tốc độ truy cập dữ liệu (không cần tính toán lại).
  - Giảm tải cho database hoặc API backend
  - Cải thiện UX (giảm thời gian chờ đợi của người dùng).

- Cấu trúc hoạt động:
  - Truy cập dữ liệu:
    - Kiểm tra trong Cache có dữ liệu không (Cache hit)
    - Nếu có thì trả về dữ liệu từ Cache (không cần truy cập database)
    - Nếu không thì truy xuất dữ liệu từ database hoặc API backend (Cache miss), sau đó lưu kết quả vào Cache để lần sau truy cập nhanh hơn.
  - Thời gian sống (TTL - Time To Live): là khoảng thời gian mà dữ liệu được lưu trữ trong Cache. Sau thời gian này, dữ liệu sẽ bị xóa khỏi Cache và phải truy xuất lại từ database hoặc API backend.

## 2. Các loại Cache phổ biến

- Memory Cache: Lưu trữ dữ liệu trong bộ nhớ RAM của server. Tốc độ truy cập rất nhanh nhưng dung lượng hạn chế.
- File Cache: Lưu trữ dữ liệu trong file trên đĩa cứng. Tốc độ truy cập chậm hơn Memory Cache nhưng dung lượng lớn hơn.
- Database Cache: Lưu trữ dữ liệu trong database. Tốc độ truy cập chậm hơn Memory Cache nhưng dung lượng lớn hơn.
- Distributed Cache: Lưu trữ dữ liệu trên nhiều server khác nhau. Tốc độ truy cập nhanh và dung lượng lớn. Thường sử dụng Redis hoặc Memcached.

## 3. Caching trong Nestjs

- Nestjs hỗ trợ caching thông qua module `@nestjs/cache-manager`.

```bash
yarn add @nestjs/cache-manager cache-manager
```

- Tính năng:
  - Hỗ trợ cache trong bộ nhớ (in-memory) mặc định
  - Hỗ trợ cache phân tán với Redis
  - Cấu hình TTL cho từng cache item
  - Tích hợp Interceptor tự động cache response
  - Cho phép xóa, kiểm tra và cập nhật cache thủ công

- Trong ví dụ này, ta sẽ sử dụng kết hợp Redis, Cache Manager và MongoDB để cache dữ liệu từ database.

- Tạo cấu hình cho Redis:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

```ts
export default = () => {
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
}
```

- Tạo `RedisCacheService` để kết nối với Redis và sử dụng Cache Manager:

```ts
import { CacheModuleOptions, CacheOptionsFactory, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';


@Injectable()
export class RedisCacheService implements CacheOptionsFactory {
  constructor(private configService: ConfigService) {}

  createCacheOptions(): CacheModuleOptions {
    return {
      store: redisStore as any,
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT'),
      ttl: 60, // seconds
    };
  }
}
```

- Cấu hình `AppModule`:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheService } from './redis/redis.cache';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: RedisCacheService,
    }),
    UsersModule,
  ],
})
export class AppModule {}
```

- Tạo `UsersService` để sử dụng Cache:

```ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(name: string, email: string): Promise<User> {
    const user = new this.userModel({ name, email });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    const cacheKey = `user:${id}`;
    const cachedUser = await this.cacheManager.get(cacheKey);

    if (cachedUser) {
      return {
        from: 'cache',
        data: cachedUser,
      };
    }

    const user = await this.userModel.findById(id).exec();
    if (user) {
      await this.cacheManager.set(cacheKey, user, 60 * 60); // Cache for 1 hour
    }

    return {
      from: 'mongo',
      data: user,
    };
  }
}
```

## 4. Những trường hợp thực tế sử dụng Cache

### 4.1. Giảm tải cho Database (DB)

- **Vấn đề**: Các truy vấn DB lặp lại (ví dụ: SELECT) chiếm nhiều tài nguyên.
- **Giải pháp**: Cache kết quả truy vấn vào bộ nhớ (Redis, Memcached).
- **Ví dụ**: Cache danh sách sản phẩm phổ biến, thông tin người dùng.

### 4.2. Kết quả API ít thay đổi

- **Vấn đề**: API trả về dữ liệu tĩnh hoặc ít thay đổi.
- **Giải pháp**: Cache response API.
- **Ví dụ**: API danh sách quốc gia, tỷ giá ngoại tệ.

### 4.3. Quản lý phiên đăng nhập (Session Management)

- **Vấn đề**: Lưu session trực tiếp trên DB gây chậm.
- **Giải pháp**: Dùng Redis lưu session.
- **Ví dụ**: User login status, JWT tokens.

### 4.4. Giới hạn truy cập (Rate Limiting)

- **Vấn đề**: Chống spam/DDoS.
- **Giải pháp**: Cache số lần request của user/IP.
- **Ví dụ**: Giới hạn 100 requests/phút từ 1 IP.

### 4.5. Cache toàn bộ trang (Full-page Caching)

- **Vấn đề**: Trang web tĩnh không cần render lại.
- **Giải pháp**: Cache HTML output (Varnish, CDN).
- **Ví dụ**: Trang chủ blog, landing page.

### 4.6. Tính toán phức tạp

- **Vấn đề**: Phép tính tốn thời gian.
- **Giải pháp**: Cache kết quả tính toán.
- **Ví dụ**: Thống kê doanh thu theo tháng.

### 4.7. Giảm độ trễ Microservices

- **Vấn đề**: Giao tiếp giữa các service gây chậm.
- **Giải pháp**: Cache response từ service khác.
- **Ví dụ**: Service Product lấy giá từ Service Pricing.

### 4.8. Kết quả tìm kiếm (Search Results)

- **Vấn đề**: Tìm kiếm cùng keyword nhiều lần.
- **Giải pháp**: Cache kết quả tìm kiếm phổ biến.
- **Ví dụ**: Từ khóa "iPhone 15" trên e-commerce.

### 4.9. Dữ liệu real-time (WebSockets)

- **Vấn đề**: Chat/notification cần truy vấn liên tục.
- **Giải pháp**: Cache tin nhắn gần nhất.
- **Ví dụ**: 100 tin nhắn cuối trong phòng chat.

### 4.10. Cá nhân hóa nội dung

- **Vấn đề**: Dữ liệu gợi ý tốn thời gian xử lý.
- **Giải pháp**: Cache recommendations cho từng user.
- **Ví dụ**: "Sản phẩm bạn có thể thích" trên Amazon.

### 4.11. Cache Layer cho ORM

- **Vấn đề**: ORM sinh query không tối ưu.
- **Giải pháp**: Cache kết quả truy vấn ORM.
- **Ví dụ**: Django QuerySet caching.

### 4.12. Ảnh đã xử lý (Thumbnails)

- **Vấn đề**: Ảnh resize tốn thời gian generate.
- **Giải pháp**: Cache ảnh đã xử lý (CDN/Redis).
- **Ví dụ**: Ảnh đại diện user nhiều kích thước.

### 4.13. Tổng hợp API (API Aggregation)

- **Vấn đề**: Gọi nhiều service bên ngoài.
- **Giải pháp**: Cache kết quả tổng hợp.
- **Ví dụ**: Thông tin vận chuyển từ nhiều nhà cung cấp.

### 4.14. Hệ thống hàng đợi (Queue Systems)

- **Vấn đề**: Xử lý task nền (email, report).
- **Giải pháp**: Dùng Redis làm queue cache.
- **Ví dụ**: Celery với Redis backend.

### 4.15. Tối ưu ghi DB (Write Optimization)

- **Vấn đề**: Ghi DB liên tục (counter, analytics).
- **Giải pháp**: Cache thao tác ghi và update theo batch.
- **Ví dụ**: Lượt xem bài viết, lượt like.

### Lưu ý khi triển khai cache

- **Invalidation Cache**: Xóa cache khi dữ liệu thay đổi.
- **TTL (Time-To-Live)**: Đặt thời gian hết hạn cache.
- **Phân biệt Cache Levels**:
  - Application Cache (Redis, Memcached)
  - Database Cache (Query cache)
  - CDN Cache (Static assets)

## 5. Những chiến lược Caching phổ biến

### 5.1. Cache-aside (Lazy Loading)

- Đây là chiến lược phổ biến nhất
- Cách hoạt động:
  - Khi client request:
    - Kiểm tra cache trước
    - Nếu có thì trả về cache
    - Nếu không có thì truy vấn DB rồi lưu vào cache và trả về client giá trị từ DB
- Ưu điểm:
  - Dễ hiểu, dễ triển khai
  - Tối ưu hóa hiệu suất
  - Chỉ cache những dữ liệu cần thiết
- Nhược điểm:
  - Có thể bị `cache miss` lần đầu
  - Tăng độ trễ cho lần truy cập đầu tiên
  - Cần quản lý cache thủ công (xóa, cập nhật)

```ts
async getProduct(id: string) {
  const key = `product:${id}`;
  let product = await this.cacheManager.get(key);
  if (product) return product;

  product = await this.productRepo.findById(id);
  await this.cacheManager.set(key, product, 60000); // TTL 60s
  return product;
}
```

### 5.2. Write-through Cache

- Cách hoạt động:
  - Khi ghi dữ liệu (INSERT, UPDATE):
    - Ghi đồng thời vào cache và DB

- Ưu điểm:
  - Dữ liệu cache luôn nhất quán với DB
  - Không bị cache miss
- Nhược điểm:
  - Tăng độ trễ khi ghi dữ liệu
  - Cần quản lý cache thủ công (xóa, cập nhật)
  - Nếu cache thất bại thì cần rollback hoặc xử lý lỗi

```ts
async updateProduct(id: string, data: UpdateProductDto) {
  const updated = await this.productRepo.update(id, data);
  await this.cacheManager.set(`product:${id}`, updated);
  return updated;
}
```

### 5.3. Write-behind Cache (Write back)

- Cách hoạt động:
  - Ghi vào cache trước, sau đó ghi vào DB sau (async)

- Ưu điểm:
  - Tốc độ ghi cực nhanh
  - Tăng hiệu suất ghi dữ liệu
- Nhược điểm:
  - Nếu cache dead trước khi sync DB thì sẽ bị mất dữ liệu
  - Phức tạp để xử lý đồng bộ và lỗi

### 5.4. Read through Cache

- Chiến lược này khá giống với Cache-aside
- Tuy nhiên, thay vì client tự kiểm tra cache, thì cache sẽ tự động kiểm tra và lấy dữ liệu từ DB
- Cách hoạt động:
  - Khi client request:
    - Cache tự động kiểm tra cache trước
    - Nếu có thì trả về cache
    - Nếu không có thì cache tự động truy vấn DB rồi lưu vào cache và trả về client giá trị từ DB
  
- Ưu điểm:
  - Không cần quan tâm đến cache miss
  - Tự động hóa việc lấy dữ liệu từ DB
- Nhược điểm:
  - Dữ liệu không đồng nhất với database trong cache
  - Khó kiểm soát cache do không biết dữ liệu được truy cập thường xuyên và 1 lần

## 6. So sánh Cache thủ công và Cache tự động

| Tiêu chí | Cache thủ công (Manual Cache) | Cache tự động (Auto Cache) |
| -- | -- | -- |
| Cách sử dụng | Ta cần tự code logic lưu và lấy cache từ Redis/Memcached | Cache tự động response từ controller thông qua `@Cacheable()` hoặc sử dụng `@UseInterceptors(CacheInterceptor)` |
| Kiểm soát | Toàn quyền kiểm soát key, TTL và xóa cache khi cần | Ít kiểm soát hơn, thường cache theo route và params |
| Thư viện liên quan | `CacheService`, `Redis`, `CacheManager` | `@nestjs/cache-manager`, `@nestjs/common` |
| Trường hợp sử dụng | Cache dữ liệu truy vấn từ DB, phân quyền, tính toán phức tạp, session | Cache response của 1 endpoint GET |
| Thời gian setup | Mất nhiều thời gian để viết và bảo trì | Cấu hình nhanh với `CacheModule` và `UseInterceptors` |
| Tính linh hoạt | Linh hoạt hơn trong việc tùy chỉnh cache | Ít linh hoạt hơn, nhưng dễ sử dụng |
| Bảo mật | Kiểm soát hoàn toàn dữ liệu cache | Có thể cache những dữ liệu nhạy cảm nếu không cẩn thận |

## 7. Auto Cache với Interceptor

- Nestjs cung cấp 1 cơ chế cache tự động thông qua Interceptor gọi là `CacheInterceptor`
- `CacheInterceptor` tự động cache lại kết quả trả về từ 1 handler dựa vào URL (request key) và TTL (time to live) mà ta đã cấu hình

- Cách hoạt động:
  - Khi client gửi request đến server:
    - Tạo key:
      - Mặc định sử dụng request URL làm key cache
      - Nếu có query params thì thêm vào key
    - Kiểm tra cache:
      - Nếu có cache thì trả về cache ngay lập tức (bỏ qua controller)
      - Nếu không có cache thì gọi handler của controller và lưu kết quả vào cache với TTL đã cấu hình
    - Lưu vào cache:
      - Sau khi controller trả về dữ liệu, interceptor sẽ tự động lưu dữ liệu vào cache với key đã tạo ở bước 1

__VD__:

- Tạo cấu hình cache trong `app.module.ts`:
```env
MONGO_URI=mongodb://localhost:27017/nestjs
REDIS_HOST=localhost
REDIS_PORT=6379
```

```ts
export default () => ({
  MONGO_URI: process.env.MONGO_URI,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
});
```

```ts
import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (config: ConfigService) => ({
        store: await redisStore,
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
        ttl: 60, // cache 60s
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
```

- Tạo Schema-Service-Controller-Module cho `User`:

```ts
// users/schemas/user.schema.ts
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  email: String,
});

// users/user.interface.ts
import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
}

// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}

// users/users.controller.ts
// src/users/users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @CacheKey('users_list')
  @CacheTTL(30)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}

// users/users.module.ts
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

```