import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './presentation/customer.controller';
import { CustomerService } from './application/services/customer.service';
import { CustomerRepository } from './infrastructure/repositories/customer.repository';
import { CustomerOrmEntity } from './infrastructure/persistence/customer.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    {
      provide: 'ICustomerRepository',
      useClass: CustomerRepository,
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {
}