import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ISalesRepository } from '../../domain/repositories/sales.repository.interface';
import { CreateSalesDto } from '../dtos/create-sales.dto';
import { SalesDto, SalesDetailDto, SalesStatsDto } from '../dtos/sales.dto';
import { Sales } from '../../domain/entities/sales.entity';
import { SalesDetail } from '../../domain/entities/sales-detail.entity';
import { SalesException } from '../../domain/exceptions/sales.exception';
import { SalesCode } from '../../domain/value-objects/sales-code.vo';

@Injectable()
export class SalesService {
  constructor(
    @Inject('ISalesRepository')
    private readonly salesRepository: ISalesRepository,
  ) {
  }

  async createSales(createSalesDto: CreateSalesDto): Promise<SalesDto> {
    try {

      const salesCountToday = await this.salesRepository.countSalesOnDate(createSalesDto.date);
      const salesCode = SalesCode.generate(createSalesDto.date, salesCountToday);

      const details = createSalesDto.details.map(detail =>
        SalesDetail.create(
          detail.productId,
          detail.listPrice,
          detail.quantity,
          detail.discountPercentage,
        ),
      );

      const sales = Sales.create(
        salesCode,
        createSalesDto.customerId,
        createSalesDto.date,
        createSalesDto.shippingCost,
        createSalesDto.discount,
        details,
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

  async getStats(): Promise<SalesStatsDto> {
    const dates = this.getMonthDates();
    const salesThisMonth = await this.salesRepository.getSalesStats(dates.firstDateCurrentMonth, dates.lastDateCurrentMonth);
    const salesLastMonth = await this.salesRepository.getSalesStats(dates.firstDatePrevMonth, dates.lastDatePrevMonth);

    return {
      sales: {
        value: salesThisMonth.sales,
        diff: this.countDiffPercentage(+salesThisMonth.sales, +salesLastMonth.sales),
      },
      totalSales: {
        value: salesThisMonth.totalSales,
        diff: this.countDiffPercentage(+salesThisMonth.totalSales, +salesLastMonth.totalSales),
      },
      soldProducts: {
        value: salesThisMonth.soldProducts,
        diff: this.countDiffPercentage(+salesThisMonth.soldProducts, +salesLastMonth.soldProducts),
      },
      activeCustomer: {
        value: salesThisMonth.activeCustomer,
        diff: this.countDiffPercentage(+salesThisMonth.activeCustomer, +salesLastMonth.activeCustomer),
      },
    };
  }

  private countDiffPercentage(a: number, b: number) {
    return (a - b) / a * 100;
  }

  private getMonthDates() {
    const today = new Date();

    const firstDatePrevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDatePrevMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    const firstDateCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDateCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      firstDatePrevMonth,
      lastDatePrevMonth,
      firstDateCurrentMonth,
      lastDateCurrentMonth,
    };
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