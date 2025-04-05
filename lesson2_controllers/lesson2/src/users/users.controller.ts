import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'Returns all users';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `Returns user #${id}`;
  }

  @Post()
  create(@Body() createUserDTO: any): string {
    return `Created a new user ${createUserDTO}`;
  }

  @Put(':id')
  update(@Param(':id') id: string, @Body() updateUserDTO: any): string {
    return `Updated user ${id} to ${updateUserDTO}`;
  }

  @Delete(':id')
  remove(@Param(':id') id: string): string {
    return `Removed user #${id}`;
  }
}
