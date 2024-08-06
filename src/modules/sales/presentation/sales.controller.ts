import { Controller, Get, Post, Body, Param, Query, ValidationPipe } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateSalesDto } from '../application/dtos/create-sales.dto';
import { SalesDto } from '../application/dtos/sales.dto';
import { CreateSalesCommand } from '../application/commands/create-sales.command';
import { GetSalesListQuery } from '../application/queries/get-sales-list.query';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Post()
  async createSales(@Body(ValidationPipe) createSalesDto: CreateSalesDto): Promise<SalesDto> {
    return this.commandBus.execute(new CreateSalesCommand(createSalesDto));
  }

  @Get(':id')
  async getSales(@Param('id') id: number): Promise<SalesDto> {
    const { items } = await this.queryBus.execute(new GetSalesListQuery(1, 1, 'id', 'ASC'));
    return items[0];
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