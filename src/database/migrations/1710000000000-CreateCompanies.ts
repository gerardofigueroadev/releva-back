import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCompanies1710000000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', length: '150', isNullable: false },
          { name: 'tax_id', type: 'varchar', length: '20', isNullable: true, isUnique: true },
          { name: 'plan', type: 'varchar', length: '20', isNullable: false, default: "'trial'" },
          { name: 'is_active', type: 'boolean', isNullable: false, default: true },
          { name: 'created_at', type: 'timestamp with time zone', isNullable: false, default: 'now()' },
          { name: 'updated_at', type: 'timestamp with time zone', isNullable: false, default: 'now()' },
        ],
      }),
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
