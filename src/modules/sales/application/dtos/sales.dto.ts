export class SalesDetailDto {
  id: number;
  productId: number;
  listPrice: number;
  quantity: number;
  discountPercentage: number;
  discountValue: number;
  priceAfterDiscount: number;
  total: number;
}

export class SalesDto {
  id: number;
  code: string;
  date: Date;
  customerId: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalPayment: number;
  details: SalesDetailDto[];
}