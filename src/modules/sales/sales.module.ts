import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { SalesController } from './presentation/sales.controller';
import { SalesService } from './application/services/sales.service';
import { SalesRepository } from './infrastructure/repositories/sales.repository';
import { SalesOrmEntity } from './infrastructure/persistence/sales.orm-entity';
import { SalesDetailOrmEntity } from './infrastructure/persistence/sales-detail.orm-entity';
import { CreateSalesHandler } from './application/commands/create-sales.handler';
import { GetSalesListHandler } from './application/queries/get-sales-list.handler';

const CommandHandlers = [CreateSalesHandler];
const QueryHandlers = [GetSalesListHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesOrmEntity, SalesDetailOrmEntity]),
    CqrsModule,
  ],
  controllers: [SalesController],
  providers: [
    SalesService,
    {
      provide: 'ISalesRepository',
      useClass: SalesRepository,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [SalesService],
})
export class SalesModule {
}