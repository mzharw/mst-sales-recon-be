import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrmEntity } from '../../infrastructure/persistence/sales.orm-entity';
import { SalesDetailOrmEntity } from '../../infrastructure/persistence/sales-detail.orm-entity';
import { GetSalesListQuery } from './get-sales-list.query';
import { SalesDto, SalesDetailDto } from '../dtos/sales.dto';

@QueryHandler(GetSalesListQuery)
export class GetSalesListHandler implements IQueryHandler<GetSalesListQuery> {
  constructor(
    @InjectRepository(SalesOrmEntity)
    private readonly salesRepository: Repository<SalesOrmEntity>,
  ) {
  }

  async execute(query: GetSalesListQuery): Promise<{ items: SalesDto[], total: number }> {
    const [sales, total] = await this.salesRepository.findAndCount({
      relations: ['details'],
      order: { [query.sortBy]: query.sortOrder },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const items = sales.map(sale => this.mapToDto(sale));

    return { items, total };
  }

  private mapToDto(sale: SalesOrmEntity): SalesDto {
    return {
      id: sale.id,
      code: sale.code,
      date: sale.date,
      customerId: sale.customerId,
      subtotal: sale.subtotal,
      discount: sale.discount,
      shippingCost: sale.shippingCost,
      totalPayment: sale.totalPayment,
      details: sale.details.map(detail => this.mapToSalesDetailDto(detail)),
    };
  }

  private mapToSalesDetailDto(detail: SalesDetailOrmEntity): SalesDetailDto {
    return {
      id: detail.id,
      productId: detail.productId,
      listPrice: detail.listPrice,
      quantity: detail.quantity,
      discountPercentage: detail.discountPercentage,
      discountValue: detail.discountValue,
      priceAfterDiscount: detail.priceAfterDiscount,
      total: detail.total,
    };
  }
}