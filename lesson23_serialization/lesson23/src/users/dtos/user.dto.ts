import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDTO {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Transform(({ value }: { value: string }) => value.toUpperCase())
  @Expose()
  role: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
