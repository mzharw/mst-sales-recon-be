import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSalesDetSchema1722929111174 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "t_sales_dets" (
        "id" SERIAL NOT NULL PRIMARY KEY,
        "salesId" integer NOT NULL,
        "productId" integer NOT NULL,
        "listPrice" numeric NOT NULL,
        "quantity" integer NOT NULL,
        "discountPercentage" numeric NOT NULL,
        "discountValue" numeric NOT NULL,
        "priceAfterDiscount" numeric NOT NULL,
        "total" numeric NOT NULL,
        FOREIGN KEY ("salesId") REFERENCES "t_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        FOREIGN KEY ("productId") REFERENCES "m_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "t_sales_dets"`);
  }

}
