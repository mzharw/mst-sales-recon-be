import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISalesRepository } from '../../domain/repositories/sales.repository.interface';
import { Sales } from '../../domain/entities/sales.entity';
import { SalesOrmEntity } from '../persistence/sales.orm-entity';
import { SalesDetailOrmEntity } from '../persistence/sales-detail.orm-entity';
import { SalesCode } from '../../domain/value-objects/sales-code.vo';
import { SalesDetail } from '../../domain/entities/sales-detail.entity';

@Injectable()
export class SalesRepository implements ISalesRepository {
  constructor(
    @InjectRepository(SalesOrmEntity)
    private readonly salesRepository: Repository<SalesOrmEntity>,
    @InjectRepository(SalesDetailOrmEntity)
    private readonly salesDetailRepository: Repository<SalesDetailOrmEntity>,
  ) {}

  async findById(id: number): Promise<Sales> {
    const salesOrm = await this.salesRepository.findOne({
      where: { id },
      relations: ['details'],
    });
    return this.mapToDomain(salesOrm);
  }

  async save(sales: Sales): Promise<Sales> {
    const salesOrm = this.mapToOrm(sales);
    const savedSales = await this.salesRepository.save(salesOrm);
    return this.mapToDomain(savedSales);
  }

  async findAll(): Promise<Sales[]> {
    const salesOrmList = await this.salesRepository.find({ relations: ['details'] });
    return salesOrmList.map(salesOrm => this.mapToDomain(salesOrm));
  }

  async findByCode(code: string): Promise<Sales> {
    const salesOrm = await this.salesRepository.findOne({
      where: { code },
      relations: ['details'],
    });
    return this.mapToDomain(salesOrm);
  }

  private mapToDomain(salesOrm: SalesOrmEntity): Sales {
    if (!salesOrm) return null;

    const details = salesOrm.details.map(
      detailOrm =>
        new SalesDetail(
          detailOrm.id,
          detailOrm.salesId,
          detailOrm.productId,
          detailOrm.listPrice,
          detailOrm.quantity,
          detailOrm.discountPercentage,
          detailOrm.discountValue,
          detailOrm.priceAfterDiscount,
          detailOrm.total
        )
    );

    return new Sales(
      salesOrm.id,
      new SalesCode(salesOrm.code),
      salesOrm.date,
      salesOrm.customerId,
      salesOrm.shippingCost,
      details,
      salesOrm.subtotal,
      salesOrm.discount,
      salesOrm.totalPayment,
    );
  }

  private mapToOrm(sales: Sales): SalesOrmEntity {
    const salesOrm = new SalesOrmEntity();
    salesOrm.id = sales.id;
    salesOrm.code = sales.code.toString();
    salesOrm.date = sales.date;
    salesOrm.customerId = sales.customerId;
    salesOrm.subtotal = sales.subtotal;
    salesOrm.discount = sales.discount;
    salesOrm.shippingCost = sales.shippingCost;
    salesOrm.totalPayment = sales.totalPayment;
    salesOrm.details = sales.details.map(detail => {
      const detailOrm = new SalesDetailOrmEntity();
      detailOrm.id = detail.id;
      detailOrm.salesId = detail.salesId;
      detailOrm.productId = detail.productId;
      detailOrm.listPrice = detail.listPrice;
      detailOrm.quantity = detail.quantity;
      detailOrm.discountPercentage = detail.discountPercentage;
      detailOrm.discountValue = detail.discountValue;
      detailOrm.priceAfterDiscount = detail.priceAfterDiscount;
      detailOrm.total = detail.total;
      return detailOrm;
    });
    return salesOrm;
  }
}