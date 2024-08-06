import { AggregateRoot } from '@nestjs/cqrs';
import { SalesDetail } from './sales-detail.entity';
import { SalesCode } from '../value-objects/sales-code.vo';

export class Sales extends AggregateRoot {
  constructor(
    public readonly id: number,
    public readonly code: SalesCode,
    public readonly date: Date,
    public readonly customerId: number,
    public readonly shippingCost: number,
    public readonly details: SalesDetail[],
    public subtotal: number,
    public discount: number,
    public totalPayment: number,
  ) {
    super();
  }

  static create(
    code: string,
    customerId: number,
    details: SalesDetail[],
    shippingCost: number,
  ): Sales {
    const subtotal = details.reduce((sum, detail) => sum + detail.total, 0);
    const discount = details.reduce((sum, detail) => sum + detail.discountValue, 0);
    const totalPayment = subtotal - discount + shippingCost;

    return new Sales(
      null,
      new SalesCode(code),
      new Date(),
      customerId,
      shippingCost,
      details,
      subtotal,
      discount,
      totalPayment,
    );
  }

  // calculateTotals(): void {
  //   this.subtotal = this.details.reduce((sum, detail) => sum + detail.total, 0);
  //   this.discount = this.details.reduce((sum, detail) => sum + detail.discountValue, 0);
  //   this.totalPayment = this.subtotal - this.discount + this.shippingCost;
  // }
}