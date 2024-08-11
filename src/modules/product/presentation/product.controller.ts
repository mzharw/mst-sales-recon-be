import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode  } from '@nestjs/common';
import { ProductService } from '../application/services/product.service';
import { CreateProductDto, UpdateProductDto } from '../application/dtos/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode (204)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}