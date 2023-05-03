import { IsEmail, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  id?: number | string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
