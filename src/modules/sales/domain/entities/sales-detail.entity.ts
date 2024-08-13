import { Product } from '../../../product/domain/entities/product.entity';

export class SalesDetail {
  constructor(
    public readonly id: number,
    public readonly salesId: number,
    public readonly productId: number,
    public readonly listPrice: number,
    public readonly quantity: number,
    public readonly discountPercentage: number,
    public readonly discountValue: number,
    public readonly priceAfterDiscount: number,
    public readonly total: number,
    public readonly products?: Product,
  ) {}

  static create(
    productId: number,
    listPrice: number,
    quantity: number,
    discountPercentage: number
  ): SalesDetail {
    const discountValue = listPrice - (discountPercentage / 100) * listPrice;
    const priceAfterDiscount = listPrice - (listPrice * discountPercentage) / 100;
    const total = priceAfterDiscount * quantity;

    return new SalesDetail(
      null,
      null,
      productId,
      listPrice,
      quantity,
      discountPercentage,
      discountValue,
      priceAfterDiscount,
      total
    );
  }
}