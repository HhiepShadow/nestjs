import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthenticatedRequest } from './auth.type';
import { NextFunction, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token) {
      req.user = {
        id: 1,
        email: 'John Doe',
        roles: ['admin'],
      };
    }
    next();
  }
}
