import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductOrmEntity } from '../../infrastructure/persistence/product.orm-entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('IProductRepository')
    private productRepository: IProductRepository,
  ) {
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product(createProductDto.code, createProductDto.name, createProductDto.price);
    return this.productRepository.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProduct = await this.findOne(id);
    const updatedProduct = { ...existingProduct, ...updateProductDto };
    return this.productRepository.update(id, updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(id);
  }
}