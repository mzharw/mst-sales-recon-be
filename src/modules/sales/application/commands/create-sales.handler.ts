import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSalesCommand } from './create-sales.command';
import { SalesService } from '../services/sales.service';
import { SalesDto } from '../dtos/sales.dto';

@CommandHandler(CreateSalesCommand)
export class CreateSalesHandler implements ICommandHandler<CreateSalesCommand> {
  constructor(private readonly salesService: SalesService) {
  }

  async execute(command: CreateSalesCommand): Promise<SalesDto> {
    return this.salesService.createSales(command.data);
  }
}