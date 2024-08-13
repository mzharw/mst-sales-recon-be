import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesOrmEntity } from '../../infrastructure/persistence/sales.orm-entity';
import { SalesDetailOrmEntity } from '../../infrastructure/persistence/sales-detail.orm-entity';
import { GetSalesListQuery } from './get-sales-list.query';
import { SalesDto, SalesDetailDto, SalesListDto } from '../dtos/sales.dto';
import { ProductOrmEntity } from '../../../product/infrastructure/persistence/product.orm-entity';
import { ProductDto } from '../../../product/application/dtos/product.dto';
import { SalesDetail } from '../../domain/entities/sales-detail.entity';

@QueryHandler(GetSalesListQuery)
export class GetSalesListHandler implements IQueryHandler<GetSalesListQuery> {
  constructor(
    @InjectRepository(SalesOrmEntity)
    private readonly salesRepository: Repository<SalesOrmEntity>,
  ) {
  }

  async execute(query: GetSalesListQuery): Promise<{
    items: (SalesListDto | SalesDto)[],
    total: number
  }> {
    const [sales, total] = await this.salesRepository.findAndCount({
      relations: ['details', 'details.products', 'customers'],
      where: query.filter,
      order: { [query.sortBy]: query.sortOrder },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    const items = sales.map(sale => query.singular ? this.mapToDtoSingular(sale) as SalesDto : this.mapToDto(sale));
    return { items, total };
  }

  private mapToDto(sale: SalesOrmEntity): SalesListDto {
    return {
      id: sale.id,
      code: sale.code,
      date: sale.date,
      subtotal: sale.subtotal,
      discount: sale.discount,
      shippingCost: sale.shippingCost,
      totalPayment: sale.totalPayment,
      customerName: sale.customers.name,
      totalDetails: sale.details.length,
    };
  }

  private mapToDtoSingular(sale: SalesOrmEntity): Omit<SalesDto, 'customerId'> {
    return {
      id: sale.id,
      code: sale.code,
      date: sale.date,
      subtotal: sale.subtotal,
      discount: sale.discount,
      shippingCost: sale.shippingCost,
      totalPayment: sale.totalPayment,
      customerName: sale.customers.name,
      details: sale.details.map(detail => this.mapToSalesDetailDto(detail)) as SalesDetail[],
    };
  }

  private mapToSalesDetailDto(detail: SalesDetailOrmEntity): Omit<SalesDetailDto, 'productId'> {
    return {
      id: detail.id,
      listPrice: detail.listPrice,
      quantity: detail.quantity,
      discountPercentage: detail.discountPercentage,
      discountValue: detail.discountValue,
      priceAfterDiscount: detail.priceAfterDiscount,
      total: detail.total,
      products: this.mapToProductDto(detail.products),
    };
  }

  private mapToProductDto(product: ProductOrmEntity): ProductDto {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      price: product.price,
    };
  }
}