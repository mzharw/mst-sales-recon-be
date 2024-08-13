import { Controller, Get, Post, Body, Param, Query, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSalesDto } from '../application/dtos/create-sales.dto';
import { SalesDto } from '../application/dtos/sales.dto';
import { CreateSalesCommand } from '../application/commands/create-sales.command';
import { GetSalesListQuery } from '../application/queries/get-sales-list.query';
import { SalesService } from '../application/services/sales.service';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly salesService: SalesService,
  ) {
  }

  @Post()
  async createSales(@Body(ValidationPipe) createSalesDto: CreateSalesDto): Promise<SalesDto> {
    return this.commandBus.execute(new CreateSalesCommand(createSalesDto));
  }

  @Get(':id/view')
  async getSales(@Param('id') id: number): Promise<SalesDto> {
    const query = new GetSalesListQuery(1, 1, 'id', 'ASC', { id: id }, true);
    const { items } = await this.queryBus.execute(query);

    return items[0];
  }

  @Get('stats')
  async getStats(){
    return this.salesService.getStats();
  }

  @Get()
  async getAllSales(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: string = 'date',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ items: SalesDto[], total: number }> {
    return this.queryBus.execute(new GetSalesListQuery(page, limit, sortBy, sortOrder));
  }
}