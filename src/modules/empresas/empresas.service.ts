import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepository: Repository<Empresa>,
  ) {}

  async create(dto: CreateEmpresaDto): Promise<Empresa> {
    if (dto.ruc) {
      const exists = await this.empresasRepository.findOne({ where: { ruc: dto.ruc } });
      if (exists) throw new ConflictException(`RUC '${dto.ruc}' ya está registrado`);
    }
    const empresa = this.empresasRepository.create(dto);
    return this.empresasRepository.save(empresa);
  }

  findAll(): Promise<Empresa[]> {
    return this.empresasRepository.find();
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresasRepository.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException(`Empresa #${id} no encontrada`);
    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto): Promise<Empresa> {
    const empresa = await this.findOne(id);
    Object.assign(empresa, dto);
    return this.empresasRepository.save(empresa);
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id);
    await this.empresasRepository.remove(empresa);
  }
}
