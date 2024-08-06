import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCustomerSchema1722854611580 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "m_customers" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "code" character varying(10) NOT NULL,
        "name" character varying(100) NOT NULL,
        "telp" character varying(20) NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "m_customers"`);
  }

}
