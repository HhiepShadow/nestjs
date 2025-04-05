import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsString({})
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
