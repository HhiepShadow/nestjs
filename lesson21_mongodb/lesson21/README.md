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

# PHẦN 21 - NESTJS MONGOOSE - MONGODB

- Nestjs cung cấp cho ta 2 cách để kết nối với MongoDB:
  - Sử dụng Mongoose
  - Sử dụng TypeORM

- Trong phần này, ta sẽ sử dụng `@nestjs/mongoose` để kết nối MongoDB

- Cài đặt:

```bash
yarn add @nestjs/mongoose mongoose
```

- Cấu hình `MongooseModule` trong `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot({
    uri: 'mongodb://localhost:27017/nestjs',
  })],
})
export class AppModule {}
```

- Tạo Schema-Service-Controller-Module cho User

```ts
// user.schema.ts
// schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>) {
    return this.userModel.create(data);
  }

  async findAll() {
    return this.userModel.find().exec();
  }
}

// users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Partial<User>) {
    return this.usersService.create(data);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}

// users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

## Cú pháp của MongooseModule

| Phương thức | Cú pháp | Mô tả |
|------------|---------|-------|
| `forRoot()` | `MongooseModule.forRoot(uri: string, options?: MongooseModuleOptions)` | Kết nối với MongoDB. `uri` là địa chỉ kết nối đến MongoDB. `options` là các tùy chọn kết nối. |
| `forRootAsync()` | `MongooseModule.forRootAsync(options: MongooseModuleAsyncOptions)` | Kết nối với MongoDB bất đồng bộ. `options` là các tùy chọn kết nối. |
| `forFeature()` | `MongooseModule.forFeature(models: Array<{ name: string; schema: Schema<any> }>)` | Đăng ký các model với Mongoose. `models` là danh sách các model cần đăng ký. |
| `forFeatureAsync()` | `MongooseModule.forFeatureAsync(options: MongooseModuleAsyncOptions)` | Đăng ký các model với Mongoose bất đồng bộ. `options` là các tùy chọn đăng ký. |
| `register()` | `MongooseModule.register(options: MongooseModuleOptions)` | Đăng ký MongooseModule với các tùy chọn. `options` là các tùy chọn đăng ký. |
| `registerAsync()` | `MongooseModule.registerAsync(options: MongooseModuleAsyncOptions)` | Đăng ký MongooseModule với các tùy chọn bất đồng bộ. `options` là các tùy chọn đăng ký. |

```ts
// forRoot()
MongooseModule.forRoot('mongodb://localhost:27017', {
  dbName: 'testdb',
  user: 'admin',
  pass: 'password',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// forRootAsync()
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
    dbName: configService.get<string>('MONGODB_DB'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }),
});

// forFeature()
MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
  { name: Post.name, schema: PostSchema },
]);

// forFeatureAsync()
MongooseModule.forFeatureAsync([
  {
    name: 'User',
    useFactory: () => {
      const schema = new mongoose.Schema({ name: String });
      schema.pre('save', () => console.log('Saving User...'));
      return schema;
    },
  },
]);
```

- `MongooseModuleOptions` là một interface định nghĩa các tùy chọn kết nối với MongoDB. Các thuộc tính của `MongooseModuleOptions` bao gồm:

```ts
export interface MongooseModuleOptions {
  uri: string;
  dbName?: string;
  user?: string;
  pass?: string;
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
  useCreateIndex?: boolean;
  useFindAndModify?: boolean;
  autoIndex?: boolean;
  autoCreate?: boolean;
  autoReconnect?: boolean;
  reconnectTries?: number;
  reconnectInterval?: number;
  poolSize?: number;
  socketTimeoutMS?: number;
  connectTimeoutMS?: number;
}
```

- `MongooseModuleAsyncOptions` là một interface định nghĩa các tùy chọn kết nối bất đồng bộ với MongoDB. Các thuộc tính của `MongooseModuleAsyncOptions` bao gồm:

```ts
export interface MongooseModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<MongooseModuleOptions> | MongooseModuleOptions;
  inject?: any[];
  imports?: any[];
  useClass?: Type<MongooseOptionsFactory>;
  useExisting?: Type<MongooseOptionsFactory>;
  connectionName?: string;
}
```