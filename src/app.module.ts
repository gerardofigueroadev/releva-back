import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './modules/health/health.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CreditPackagesModule } from './modules/credit-packages/credit-packages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule,
    HealthModule,
    CompaniesModule,
    RolesModule,
    UsersModule,
    AuthModule,
    CreditPackagesModule,
  ],
})
export class AppModule {}
