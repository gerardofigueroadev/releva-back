import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditPackage } from './entities/credit-package.entity';
import { CreditPackagesService } from './credit-packages.service';
import { CreditPackagesController } from './credit-packages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CreditPackage])],
  controllers: [CreditPackagesController],
  providers: [CreditPackagesService],
  exports: [CreditPackagesService],
})
export class CreditPackagesModule {}
