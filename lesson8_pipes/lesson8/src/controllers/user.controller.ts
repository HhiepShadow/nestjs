import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/dtos/create-user-dto';
import { ParsePositiveIntPipe } from 'src/pipes/parse-positive-int.pipe';

@Controller('users')
export class UserController {
  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  createUser(@Body() createUserDto: CreateUserDTO) {
    return {
      message: 'User created successfully',
      user: createUserDto,
    };
  }

  @Get(':id')
  getUserById(@Param('id', ParsePositiveIntPipe) id: number) {
    return `User with ID: ${id}`;
  }
}
