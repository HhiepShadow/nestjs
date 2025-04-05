import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: string[] = [];

  findAll(): string[] {
    return this.users;
  }

  create(user: string): void {
    this.users.push(user);
  }
}
