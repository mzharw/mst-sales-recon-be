import { CustomerDto } from '../../../customer/application/dtos/customer.dto';
import { ProductDto } from '../../../product/application/dtos/product.dto';
import { Sales } from '../../domain/entities/sales.entity';

export class SalesDetailDto {
  id: number;
  productId: number;
  listPrice: number;
  quantity: number;
  discountPercentage: number;
  discountValue: number;
  priceAfterDiscount: number;
  total: number;
  products?: ProductDto;
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
  customerName?: string;
}

export class SalesListDto {
  id: number;
  code: string;
  date: Date;
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalPayment: number;
  customerName: string;
  totalDetails: number;
}


class SalesStats {
  value: string | number;
  diff: string | number;
}

export class SalesStatsValueDto {
  sales: string | number;
  totalSales: string | number;
  soldProducts: string | number;
  activeCustomer: string | number;
}

export class SalesStatsDto {
  sales: SalesStats;
  totalSales: SalesStats;
  soldProducts: SalesStats;
  activeCustomer: SalesStats;
}