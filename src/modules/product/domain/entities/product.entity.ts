import { SalesDetailOrmEntity } from '../../../sales/infrastructure/persistence/sales-detail.orm-entity';

export class Product {
  id: number;
  code: string;
  name: string;
  price: number;
  sales?: SalesDetailOrmEntity[];

  constructor(code: string, name: string, price: number, sales?: SalesDetailOrmEntity[]) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.sales = sales;
  }
}