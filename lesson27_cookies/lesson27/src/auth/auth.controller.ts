// src/auth/auth.controller.ts
import { Controller, Post, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  login(@Res() res: Response) {
    const userId = 'user123'; // giả lập
    const token = this.authService.login(userId);

    res.cookie(this.configService.get('COOKIE_NAME') as string, token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: parseInt(this.configService.get('COOKIE_MAX_AGE') || '86400000'),
    });

    return res.status(HttpStatus.OK).send({ message: 'Đăng nhập thành công' });
  }

  @Get('me')
  getMe(@Req() req: Request, @Res() res: Response) {
    const cookies = (req as Request & { cookies: any }).cookies;
    const token = cookies[this.configService.get('COOKIE_NAME')];
    const payload = this.authService.verify(token);

    if (!payload) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Token không hợp lệ' });
    }

    return res.send({ user: payload });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie(this.configService.get('COOKIE_NAME') as string);
    return res.send({ message: 'Đăng xuất thành công' });
  }
}
