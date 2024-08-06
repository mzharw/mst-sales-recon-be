import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './presentation/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductOrmEntity } from './infrastructure/persistence/product.orm-entity';
import { ProductRepository } from './infrastructure/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [ProductService, {
    provide: 'IProductRepository',
    useClass: ProductRepository,
  }],
  exports: [ProductService],
})
export class ProductModule {
}