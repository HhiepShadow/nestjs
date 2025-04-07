import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  findUser() {
    return {
      id: 1,
      name: 'John Doe',
    };
  }
}
