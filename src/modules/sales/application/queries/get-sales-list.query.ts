import { FindOptionsWhere } from 'typeorm';
import { SalesOrmEntity } from '../../infrastructure/persistence/sales.orm-entity';

export class GetSalesListQuery {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
    public readonly sortBy: string = 'date',
    public readonly sortOrder: 'ASC' | 'DESC' = 'DESC',
    public readonly filter?: FindOptionsWhere<SalesOrmEntity> | FindOptionsWhere<SalesOrmEntity>[],
    public readonly singular: boolean = false,
  ) {
  }
}