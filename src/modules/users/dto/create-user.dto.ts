import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, IsInt, IsPositive } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsInt()
  @IsPositive()
  roleId: number;

  @IsInt()
  @IsPositive()
  companyId: number;
}
