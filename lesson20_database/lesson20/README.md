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

# PHẦN 20 - DATABASE

## 1. Giới thiệu về Database trong Nestjs

- Nestjs là 1 database-agnostic, tức là không phụ thuộc vào loại cơ sở dữ liệu nào
- Ta có thể sử dụng:
  - SQL: PostgreSQL, MySQL, MSSQL, SQLite, MariaDB, OracleDB, v.v.
  - NoSQL: MongoDB, Redis, Cassandra, v.v.

- Ta có 2 hướng tiếp cận:
  - Tự dùng driver Nodejs gốc để kết nối với DB
  - Sử dụng ORM/ODM tích hợp sẵn

- Trong Nestjs, ta có thể sử dụng các package tích hợp chặt chẽ với một số ORM/ODM:

| Tên package | ORM/ODM | Ưu điểm |
|-------------|---------|---------|
| `@nestjs/typeorm` | TypeORM (SQL) | ORM mạnh, tích hợp sẵn với Nestjs, hỗ trợ nhiều loại DB |
| `@nestjs/sequelize` | Sequelize (SQL) | ORM mạnh, tích hợp sẵn với Nestjs, hỗ trợ nhiều loại DB |
| `@nestjs/mongoose` | Mongoose (NoSQL) | ODM mạnh, tích hợp sẵn với Nestjs, hỗ trợ MongoDB |
| `@nestjs/typegoose` | Typegoose (NoSQL) | ODM mạnh, tích hợp sẵn với Nestjs, hỗ trợ MongoDB |
| `@nestjs/redis` | Redis (NoSQL) | Tích hợp sẵn với Nestjs, hỗ trợ Redis |
| `@nestjs/terminus` | Health check | Tích hợp sẵn với Nestjs, hỗ trợ health check cho các service |
| Tùy chọn khác | Prisma, MikroORM | Hiện đại, typed tốt |

## 2. ORM - ODM

### 2.1. ORM (Object Relational Mapping)

- ORM là kỹ thuật ánh xạ giữa các đối tượng trong mã nguồn như class, struct, v.v. với các bảng trong cơ sở dữ liệu quan hệ (SQL)
- ORM giúp ta thao tác với cơ sở dữ liệu bằng các đối tượng trong mã nguồn thay vì phải viết các câu lệnh SQL phức tạp

__VD__:

```ts
// user.entity.ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

// user.service.ts
const user = new User();
user.name = "John Doe";
user.email = "john@gmail.com";
await userRepository.save(user);
```

- Trong ví dụ trên, ta đã tạo ra một đối tượng `User` và lưu nó vào cơ sở dữ liệu mà không cần phải viết câu lệnh SQL nào cả. ORM sẽ tự động chuyển đổi đối tượng thành câu lệnh SQL và thực thi nó.

### 2.2. ODM (Object Document Mapping)

- ODM là kỹ thuật tương tự ORM, nhưng áp dụng cho các cơ sở dữ liệu phi quan hệ (NoSQL), đặc biệt là MongoDB
- ODM ánh xạ giữa đối tượng trong mã nguồn và document trong cơ sở dữ liệu NoSQL

__VD__:

```ts
// user.schema.ts
@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// user.service.ts
const user = this.userSchema({ name: "John Doe", email: "john@gmail.com" });
await user.save();
```

## 3. TypeORM

- TypeORM là 1 ORM giúp ta thao tác với database bằng cách ánh xạ các đối tượng với các bảng trong database

### 3.1. Các đặc điểm của TypeORM

- Hỗ trợ nhiều database khác nhau như MySQL, PostgreSQL, SQLite, MongoDB, v.v.
- Entity-based: Định nghĩa cấu trúc dữ liệu thông qua các class entity
- Active Record: Hỗ trợ thao tác với database thông qua các phương thức của entity
- Query Builder: Hỗ trợ xây dựng các câu truy vấn phức tạp bằng cách sử dụng các phương thức của QueryBuilder
- Data Mapper: Hỗ trợ ánh xạ giữa các đối tượng trong mã nguồn và các bảng trong database
- Relations: Hỗ trợ đầy đủ các loại quan hệ (1-1, 1-n, n-n) giữa các entity
- Transactions: Quản lý giao dịch database
- Migrations: Quản lý các thay đổi trong cấu trúc database
- Caching: Hỗ trợ caching để tăng tốc độ truy vấn

### 3.2. Các thành phần

| Annotation | Cú pháp | Mô tả |
| `@Entity()` | `@Entity('table_name')` | Đánh dấu class là một entity và ánh xạ với bảng trong database |
| `@Column()` | `@Column({ type: 'string', nullable: true })` | Đánh dấu thuộc tính là một cột trong bảng |
| `@PrimaryGeneratedColumn()` | `@PrimaryGeneratedColumn()` | Đánh dấu thuộc tính là khóa chính và tự động tăng |
| `@CreateDateColumn()` | `@CreateDateColumn()` | Đánh dấu thuộc tính là cột ngày tạo |
| `@UpdateDateColumn()` | `@UpdateDateColumn()` | Đánh dấu thuộc tính là cột ngày cập nhật |
| `@DeleteDateColumn()` | `@DeleteDateColumn()` | Đánh dấu thuộc tính là cột ngày xóa |
| `@OneToMany()` | `@OneToMany(() => Post, (post) => post.user)` | Đánh dấu quan hệ 1-n giữa 2 entity |
| `@ManyToOne()` | `@ManyToOne(() => User, (user) => user.posts)` | Đánh dấu quan hệ n-1 giữa 2 entity |
| `@ManyToMany()` | `@ManyToMany(() => Tag, (tag) => tag.posts)` | Đánh dấu quan hệ n-n giữa 2 entity |
| `@JoinTable()` | `@JoinTable()` | Đánh dấu bảng trung gian trong quan hệ n-n |
| `@JoinColumn()` | `@JoinColumn()` | Đánh dấu cột khóa ngoại trong quan hệ 1-1 hoặc n-1 |
| `@Index()` | `@Index('index_name', ['column1', 'column2'])` | Đánh dấu cột là chỉ mục |
| `@Unique()` | `@Unique('unique_name', ['column1', 'column2'])` | Đánh dấu cột là duy nhất |
| `@Check()` | `@Check('check_name', 'column1 > 0')` | Đánh dấu cột là điều kiện kiểm tra |
| `@Generated()` | `@Generated('uuid')` | Đánh dấu cột là tự động sinh giá trị |
| `@BeforeInsert()` | `@BeforeInsert()` | Đánh dấu phương thức sẽ được gọi trước khi chèn dữ liệu |
| `@AfterInsert()` | `@AfterInsert()` | Đánh dấu phương thức sẽ được gọi sau khi chèn dữ liệu |
| `@BeforeUpdate()` | `@BeforeUpdate()` | Đánh dấu phương thức sẽ được gọi trước khi cập nhật dữ liệu |
| `@AfterUpdate()` | `@AfterUpdate()` | Đánh dấu phương thức sẽ được gọi sau khi cập nhật dữ liệu |
| `@BeforeRemove()` | `@BeforeRemove()` | Đánh dấu phương thức sẽ được gọi trước khi xóa dữ liệu |
| `@AfterRemove()` | `@AfterRemove()` | Đánh dấu phương thức sẽ được gọi sau khi xóa dữ liệu |
| `@AfterLoad()` | `@AfterLoad()` | Đánh dấu phương thức sẽ được gọi sau khi tải dữ liệu |

### 3.3. Cài đặt và cấu hình TypeORM

- Cài đặt:

```bash
yarn add typeorm @nestjs/typeorm pg

yarn add typeorm @nestjs/typeorm mysql2
```ts

- Tạo file `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=nestjs_demo
```

- Cấu hình `ConfigModule` và `TypeOrmModule` trong `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    // Load biến môi trường từ file .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Sử dụng ConfigService để cấu hình TypeORM
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    UserModule,
  ],
})
export class AppModule {}
```

- Tạo Entity-Service-Controller-Module cho User:

```ts
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;
}

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}

// user.controller.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}

// user.module.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }
}
```

## 4. Repository Pattern

- Repository Pattern là một mẫu thiết kế giúp tách biệt logic truy cập dữ liệu khỏi logic nghiệp vụ trong ứng dụng
- Nói cách khác:  
__Repository là cầu nối giữa tầng dữ liệu (database) và tầng nghiệp vụ (business - service)__

- Cú pháp:

```ts
// user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findById(id);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

- Danh sách các phương thức của Repository:

| Phương thức            | Mô tả                                                                 | Cú pháp sử dụng                                              |
|------------------------|----------------------------------------------------------------------|---------------------------------------------------------------|
| find()                 | Lấy tất cả bản ghi                                                   | `repository.find()`                                          |
| findOne()              | Lấy 1 bản ghi theo điều kiện                                          | `repository.findOne({ where: { id: 1 } })`                   |
| findOneBy()            | Tương tự findOne nhưng đơn giản hơn                                  | `repository.findOneBy({ id: 1 })`                            |
| findBy()               | Lấy nhiều bản ghi theo điều kiện                                     | `repository.findBy({ isActive: true })`                      |
| findAndCount()         | Trả về bản ghi + số lượng tổng                                       | `repository.findAndCount()`                                  |
| findOneOrFail()        | Tương tự findOne, nhưng sẽ throw nếu không tìm thấy                 | `repository.findOneOrFail({ where: { id: 1 } })`             |
| save()                 | Lưu hoặc cập nhật entity (nếu có id)                                 | `repository.save(user)`                                      |
| insert()               | Thêm dữ liệu mà không cần fetch lại                                  | `repository.insert({ name: 'John' })`                        |
| update()               | Cập nhật bản ghi theo điều kiện                                      | `repository.update({ id: 1 }, { name: 'Updated' })`          |
| delete()               | Xoá bản ghi theo điều kiện                                           | `repository.delete({ id: 1 })`                               |
| softDelete()           | Xoá mềm (nếu entity có @DeleteDateColumn)                           | `repository.softDelete({ id: 1 })`                           |
| restore()              | Khôi phục bản ghi bị soft delete                                     | `repository.restore({ id: 1 })`                              |
| count()                | Đếm số bản ghi                                                       | `repository.count()`                                         |
| exist()                | Kiểm tra sự tồn tại của bản ghi                                      | `repository.exist({ where: { id: 1 } })`                     |
| create()               | Tạo entity mới (chưa lưu)                                            | `const user = repository.create({ name: 'New' })`            |
| merge()                | Gộp nhiều object thành 1 entity                                      | `repository.merge(user, { name: 'Updated' })`                |
| preload()              | Tạo entity từ dữ liệu đầu vào và fetch dữ liệu hiện tại             | `repository.preload({ id: 1, name: 'New name' })`            |
| query()                | Gửi raw SQL query                                                    | `repository.query('SELECT * FROM user')`                     |
| clear()                | Xoá toàn bộ bản ghi trong bảng (CẢNH BÁO!)                           | `repository.clear()`                                         |
| increment()            | Tăng giá trị một trường số                                           | `repository.increment({ id: 1 }, 'views', 1)`                |
| decrement()            | Giảm giá trị một trường số                                           | `repository.decrement({ id: 1 }, 'views', 1)`                |
| createQueryBuilder()   | Tạo query nâng cao bằng QueryBuilder                                 | `repository.createQueryBuilder('user').where(...).getMany()`|
