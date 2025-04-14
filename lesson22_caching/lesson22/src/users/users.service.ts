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
      await this.cacheManager.set(cacheKey, user, 60 * 60 * 1000); // Cache for 1 hour
    }

    return {
      from: 'mongo',
      data: user,
    };
  }
}
