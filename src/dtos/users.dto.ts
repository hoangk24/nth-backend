import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullName: string;
}

export class LoginUserDto {
  @IsEmail()
  public email?: string;

  @IsString()
  public password: string;
}
