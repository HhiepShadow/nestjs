import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './user.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
