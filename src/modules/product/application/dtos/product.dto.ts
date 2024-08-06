import { IsString, IsNotEmpty, Length, IsNumber, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  code: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}