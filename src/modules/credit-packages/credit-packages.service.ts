import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreditPackage } from './entities/credit-package.entity';
import { CreateCreditPackageDto } from './dto/create-credit-package.dto';
import { UpdateCreditPackageDto } from './dto/update-credit-package.dto';

@Injectable()
export class CreditPackagesService {
  constructor(
    @InjectRepository(CreditPackage)
    private readonly repo: Repository<CreditPackage>,
  ) {}

  create(dto: CreateCreditPackageDto): Promise<CreditPackage> {
    const pkg = this.repo.create(dto);
    return this.repo.save(pkg);
  }

  findAll(): Promise<CreditPackage[]> {
    return this.repo.find({ order: { price: 'ASC' } });
  }

  findActive(): Promise<CreditPackage[]> {
    return this.repo.find({ where: { isActive: true }, order: { price: 'ASC' } });
  }

  async findOne(id: number): Promise<CreditPackage> {
    const pkg = await this.repo.findOneBy({ id });
    if (!pkg) throw new NotFoundException(`Package ${id} not found`);
    return pkg;
  }

  async update(id: number, dto: UpdateCreditPackageDto): Promise<CreditPackage> {
    const pkg = await this.findOne(id);
    Object.assign(pkg, dto);
    return this.repo.save(pkg);
  }

  async remove(id: number): Promise<void> {
    const pkg = await this.findOne(id);
    await this.repo.remove(pkg);
  }
}
