import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUsers1710000002000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          { name: 'id', type: 'serial', isPrimary: true },
          { name: 'name', type: 'varchar', length: '100', isNullable: false },
          { name: 'email', type: 'varchar', length: '150', isNullable: false, isUnique: true },
          { name: 'password', type: 'varchar', length: '255', isNullable: false },
          { name: 'is_active', type: 'boolean', isNullable: false, default: true },
          { name: 'role_id', type: 'integer', isNullable: false },
          { name: 'empresa_id', type: 'integer', isNullable: false },
          { name: 'created_at', type: 'timestamp with time zone', isNullable: false, default: 'now()' },
          { name: 'updated_at', type: 'timestamp with time zone', isNullable: false, default: 'now()' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FK_users_role',
        columnNames: ['role_id'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'FK_users_empresa',
        columnNames: ['empresa_id'],
        referencedTableName: 'empresas',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'FK_users_empresa');
    await queryRunner.dropForeignKey('users', 'FK_users_role');
    await queryRunner.dropTable('users');
  }
}
