import { Sales } from '../entities/sales.entity';
import { SalesStatsValueDto } from '../../application/dtos/sales.dto';

export interface ISalesRepository {
  findById(id: number): Promise<Sales>;

  save(sales: Sales): Promise<Sales>;

  findAll(): Promise<Sales[]>;

  findByCode(code: string): Promise<Sales>;

  countSalesOnDate(date: Date): Promise<number>;

  getSalesStats(date: Date, toDate: Date): Promise<SalesStatsValueDto>;
}