import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CustomerDto {
  id: number;
  code: string;
  name: string;
  telp: string;
}

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  code: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  telp: string;
}

export class UpdateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  telp: string;
}