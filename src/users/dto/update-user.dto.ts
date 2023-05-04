import { IsEmail, IsString, MaxLength, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @MinLength(6)
  @MaxLength(50)
  @IsOptional()
  @IsString()
  password: string;
}