import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = ['Alice', 'Bob'];

  findAll(): string[] {
    return this.users;
  }
}
