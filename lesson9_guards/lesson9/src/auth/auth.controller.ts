import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthenticatedRequest } from './auth.type';

@Controller('auth')
@UseGuards(AuthGuard)
export class AuthController {
  @Get('protected')
  getProtected(@Request() req: AuthenticatedRequest): {
    message: string;
    user: any;
  } {
    return {
      message: 'You are authenticated!',
      user: req.user,
    };
  }
}
