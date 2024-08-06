import { Sales } from '../entities/sales.entity';

export interface ISalesRepository {
  findById(id: number): Promise<Sales>;

  save(sales: Sales): Promise<Sales>;

  findAll(): Promise<Sales[]>;

  findByCode(code: string): Promise<Sales>;
}