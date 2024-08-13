import { AggregateRoot } from '@nestjs/cqrs';
import { SalesDetail } from './sales-detail.entity';
import { SalesCode } from '../value-objects/sales-code.vo';
import { Customer } from '../../../customer/domain/entities/customer.entity';

export class Sales extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly code: SalesCode,
    public readonly date: Date,
    public readonly customerId: number,
    public readonly shippingCost: number,
    public subtotal: number,
    public discount: number,
    public totalPayment: number,
    public readonly details?: SalesDetail[],
    public readonly customers?: Customer,
  ) {
    super();
  }

  static create(
    code: SalesCode,
    customerId: number,
    date: Date,
    shippingCost: number,
    discount: number,
    details: SalesDetail[],
  ): Sales {
    const subtotal = details.reduce((sum, detail) => sum + detail.total, 0);
    const totalPayment = subtotal - discount + shippingCost;

    return new Sales(
      null,
      code,
      date,
      customerId,
      shippingCost,
      subtotal,
      discount,
      totalPayment,
      details,
    );
  }
}