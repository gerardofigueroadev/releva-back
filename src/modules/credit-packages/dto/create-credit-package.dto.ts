import { IsString, IsInt, IsNumber, IsBoolean, IsOptional, Min, MaxLength } from 'class-validator';

export class CreateCreditPackageDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsInt()
  @Min(1)
  credits: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
