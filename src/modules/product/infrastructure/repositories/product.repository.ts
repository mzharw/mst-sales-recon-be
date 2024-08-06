import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../persistence/product.orm-entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly ormRepository: Repository<ProductOrmEntity>,
  ) {
  }

  async create(product: Product): Promise<Product> {
    const ormEntity = this.toOrmEntity(product);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<Product[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(entity => this.toDomainEntity(entity));
  }

  async findById(id: number): Promise<Product> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.ormRepository.update(id, productData);
    const updated = await this.ormRepository.findOne({ where: { id } });
    return this.toDomainEntity(updated);
  }

  async remove(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  private toDomainEntity(ormEntity: ProductOrmEntity): Product {
    const product = new Product(ormEntity.code, ormEntity.name, ormEntity.price);
    product.id = ormEntity.id;
    return product;
  }

  private toOrmEntity(product: Product): ProductOrmEntity {
    const ormEntity = new ProductOrmEntity();
    ormEntity.id = product.id;
    ormEntity.code = product.code;
    ormEntity.name = product.name;
    ormEntity.price = product.price;
    return ormEntity;
  }
}