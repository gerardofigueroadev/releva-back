import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  taxId?: string;

  @IsString()
  @IsOptional()
  plan?: string;
}
