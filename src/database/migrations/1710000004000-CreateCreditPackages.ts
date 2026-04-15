import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCreditPackages1710000004000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "credit_packages" (
        "id" SERIAL PRIMARY KEY,
        "name" varchar(100) NOT NULL,
        "credits" integer NOT NULL,
        "price" numeric(10,2) NOT NULL,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "credit_packages"`);
  }
}
