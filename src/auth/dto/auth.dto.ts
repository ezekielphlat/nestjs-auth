import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be between 3 and 20 char' })
  password: string;
}
