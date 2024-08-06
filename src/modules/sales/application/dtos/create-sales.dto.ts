import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateSalesDetailDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  discountPercentage: number;
}

export class CreateSalesDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  shippingCost: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesDetailDto)
  details: CreateSalesDetailDto[];
}