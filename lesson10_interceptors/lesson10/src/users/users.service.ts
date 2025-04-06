import { Injectable } from '@nestjs/common';
import { User } from 'type';

@Injectable()
export class UsersService {
  findAll(): User[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];
  }
}
