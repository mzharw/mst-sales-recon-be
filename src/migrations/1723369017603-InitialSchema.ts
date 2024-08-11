import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1723369017603 implements MigrationInterface {
    name = 'InitialSchema1723369017603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "t_sales" ("id" SERIAL NOT NULL, "code" character varying(15) NOT NULL, "date" TIMESTAMP NOT NULL, "customerId" integer NOT NULL, "subtotal" numeric(18,2) NOT NULL, "discount" numeric(18,2) NOT NULL, "shippingCost" numeric(18,2) NOT NULL, "totalPayment" numeric(18,2) NOT NULL, CONSTRAINT "PK_ee07559e364ec7227f9799ca513" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "m_products" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(100) NOT NULL, "price" numeric(18,2) NOT NULL, CONSTRAINT "PK_291f8ae0bb186065b89311b985d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "t_sales_dets" ("id" SERIAL NOT NULL, "salesId" integer NOT NULL, "productId" integer NOT NULL, "listPrice" numeric(18,2) NOT NULL, "quantity" integer NOT NULL, "discountPercentage" numeric(18,2) NOT NULL, "discountValue" numeric(18,2) NOT NULL, "priceAfterDiscount" numeric(18,2) NOT NULL, "total" numeric(18,2) NOT NULL, CONSTRAINT "PK_11fbed12a094a7ecabe8a77233a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "m_customers" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "name" character varying(100) NOT NULL, "telp" character varying(20) NOT NULL, CONSTRAINT "PK_ca6280e0ca577afb7a91610595a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "t_sales" ADD CONSTRAINT "FK_326317195f12849e572c67be24b" FOREIGN KEY ("customerId") REFERENCES "m_customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_sales_dets" ADD CONSTRAINT "FK_a9f9512e8d86be1434c62c7034d" FOREIGN KEY ("salesId") REFERENCES "t_sales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "t_sales_dets" ADD CONSTRAINT "FK_0da5375c5589385eb3628316180" FOREIGN KEY ("productId") REFERENCES "m_products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "t_sales_dets" DROP CONSTRAINT "FK_0da5375c5589385eb3628316180"`);
        await queryRunner.query(`ALTER TABLE "t_sales_dets" DROP CONSTRAINT "FK_a9f9512e8d86be1434c62c7034d"`);
        await queryRunner.query(`ALTER TABLE "t_sales" DROP CONSTRAINT "FK_326317195f12849e572c67be24b"`);
        await queryRunner.query(`DROP TABLE "m_customers"`);
        await queryRunner.query(`DROP TABLE "t_sales_dets"`);
        await queryRunner.query(`DROP TABLE "m_products"`);
        await queryRunner.query(`DROP TABLE "t_sales"`);
    }

}
