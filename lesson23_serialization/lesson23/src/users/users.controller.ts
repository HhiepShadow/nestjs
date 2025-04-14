import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UserDTO } from './dtos/user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  @Get()
  getUser() {
    return new UserDTO({
      id: 1,
      username: 'john',
      email: 'john@gmail.com',
      role: 'admin',
      password: 'secret',
    });
  }
}
