import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
