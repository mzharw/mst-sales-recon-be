import { CreateSalesDto } from '../dtos/create-sales.dto';

export class CreateSalesCommand {
  constructor(public readonly data: CreateSalesDto) {}
}