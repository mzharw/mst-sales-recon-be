import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesSchema1722927792999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "t_sales" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "code" character varying(15) NOT NULL,
        "date" TIMESTAMP NOT NULL,
        "customerId" integer NOT NULL,
        "subtotal" numeric NOT NULL,
        "discount" numeric NOT NULL,
        "shippingCost" numeric NOT NULL,
        "totalPayment" numeric NOT NULL,
        FOREIGN KEY ("customerId") REFERENCES "m_customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "t_sales"`);
  }
}
