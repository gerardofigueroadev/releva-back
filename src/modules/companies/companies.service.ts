import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(dto: CreateCompanyDto): Promise<Company> {
    if (dto.taxId) {
      const exists = await this.companiesRepository.findOne({ where: { taxId: dto.taxId } });
      if (exists) throw new ConflictException(`Tax ID '${dto.taxId}' is already registered`);
    }
    const company = this.companiesRepository.create(dto);
    return this.companiesRepository.save(company);
  }

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id } });
    if (!company) throw new NotFoundException(`Company #${id} not found`);
    return company;
  }

  async update(id: number, dto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    Object.assign(company, dto);
    return this.companiesRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companiesRepository.remove(company);
  }

  async addCredits(id: number, amount: number): Promise<Company> {
    const company = await this.findOne(id);
    company.credits = (company.credits ?? 0) + amount;
    return this.companiesRepository.save(company);
  }
}
