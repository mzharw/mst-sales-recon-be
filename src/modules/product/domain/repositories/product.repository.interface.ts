import { Product } from '../entities/product.entity';

export interface IProductRepository {
  create(product: Product): Promise<Product>;

  findAll(): Promise<Product[]>;

  findById(id: number): Promise<Product>;

  update(id: number, product: Partial<Product>): Promise<Product>;

  remove(id: number): Promise<void>;
}