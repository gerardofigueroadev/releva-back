import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateEmpresaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  ruc?: string;

  @IsString()
  @IsOptional()
  plan?: string;
}
