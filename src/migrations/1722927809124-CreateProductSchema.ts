import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductSchema1722927809124 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "m_products" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "code" character varying(10) NOT NULL,
        "name" character varying(100) NOT NULL,
        "price" numeric NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "m_products"`);
  }

}
