import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('hello')
export class HelloController {
  @Get()
  getHello(): string {
    return 'Hello, World';
  }

  @Get('request')
  find(@Req() req: Request): string {
    return `This action returns request: ${req.url}`;
  }
}
