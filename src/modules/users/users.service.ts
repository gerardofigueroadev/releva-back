import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly companiesService: CompaniesService,
  ) {}

  async create(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const exists = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException(`Email '${dto.email}' is already registered`);
    const role = await this.rolesService.findOne(dto.roleId);
    const company = await this.companiesService.findOne(dto.companyId);
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepository.create({ ...dto, password: hashed, role, company });
    const saved = await this.usersRepository.save(user);
    const { password, ...result } = saved as any;
    return result;
  }

  findAll(companyId: number): Promise<User[]> {
    return this.usersRepository.find({ where: { company: { id: companyId } } });
  }

  async findOne(id: number, companyId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id, company: { id: companyId } } });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.company', 'company')
      .where('user.email = :email', { email })
      .getOne();
  }

  async update(id: number, companyId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id, companyId);
    if (dto.roleId) user.role = await this.rolesService.findOne(dto.roleId);
    if (dto.name !== undefined) user.name = dto.name;
    if (dto.isActive !== undefined) user.isActive = dto.isActive;
    return this.usersRepository.save(user);
  }

  async remove(id: number, companyId: number): Promise<void> {
    const user = await this.findOne(id, companyId);
    await this.usersRepository.remove(user);
  }
}
