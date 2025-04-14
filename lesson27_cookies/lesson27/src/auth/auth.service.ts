import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  login(userId: string): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    return jwt.sign({ userId }, secret as string, { expiresIn: '1d' });
  }

  verify(token: string): any {
    try {
      return jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET') as string,
      );
    } catch {
      return null;
    }
  }
}
