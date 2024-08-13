import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SalesOrmEntity } from './sales.orm-entity';
import { ProductOrmEntity } from '../../../product/infrastructure/persistence/product.orm-entity';

@Entity('t_sales_dets')
export class SalesDetailOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  salesId: number;

  @Column()
  productId: number;

  @Column('decimal', { precision: 18, scale: 2 })
  listPrice: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discountPercentage: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discountValue: number;

  @Column('decimal', { precision: 18, scale: 2 })
  priceAfterDiscount: number;

  @Column('decimal', { precision: 18, scale: 2 })
  total: number;

  @ManyToOne(() => SalesOrmEntity, sales => sales.details)
  @JoinColumn({ name: 'salesId' })
  sales: SalesOrmEntity;

  @ManyToOne(() => ProductOrmEntity, product => product.sales)
  @JoinColumn({ name: 'productId' })
  products?: ProductOrmEntity;
}