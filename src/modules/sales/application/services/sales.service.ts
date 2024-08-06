import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ISalesRepository } from '../../domain/repositories/sales.repository.interface';
import { CreateSalesDto } from '../dtos/create-sales.dto';
import { SalesDto, SalesDetailDto } from '../dtos/sales.dto';
import { Sales } from '../../domain/entities/sales.entity';
import { SalesDetail } from '../../domain/entities/sales-detail.entity';
import { SalesException } from '../../domain/exceptions/sales.exception';

@Injectable()
export class SalesService {
  constructor(
    @Inject('ISalesRepository')
    private readonly salesRepository: ISalesRepository
  ) {}

  async createSales(createSalesDto: CreateSalesDto): Promise<SalesDto> {
    try {
      const details = createSalesDto.details.map(detail =>
        SalesDetail.create(
          detail.productId,
          0,
          detail.quantity,
          detail.discountPercentage,
        ),
      );

      const sales = Sales.create(
        createSalesDto.code,
        createSalesDto.customerId,
        details,
        createSalesDto.shippingCost,
      );

      const savedSales = await this.salesRepository.save(sales);
      return this.mapToDto(savedSales);
    } catch (error) {
      if (error instanceof SalesException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async getSales(id: number): Promise<SalesDto> {
    const sales = await this.salesRepository.findById(id);
    if (!sales) {
      throw new NotFoundException(`Sales with id ${id} not found`);
    }
    return this.mapToDto(sales);
  }

  async getAllSales(): Promise<SalesDto[]> {
    const salesList = await this.salesRepository.findAll();
    return salesList.map(sales => this.mapToDto(sales));
  }

  private mapToDto(sales: Sales): SalesDto {
    return {
      id: sales.id,
      code: sales.code.toString(),
      date: sales.date,
      customerId: sales.customerId,
      subtotal: sales.subtotal,
      discount: sales.discount,
      shippingCost: sales.shippingCost,
      totalPayment: sales.totalPayment,
      details: sales.details.map(detail => ({
        id: detail.id,
        productId: detail.productId,
        listPrice: detail.listPrice,
        quantity: detail.quantity,
        discountPercentage: detail.discountPercentage,
        discountValue: detail.discountValue,
        priceAfterDiscount: detail.priceAfterDiscount,
        total: detail.total,
      })),
    };
  }
}