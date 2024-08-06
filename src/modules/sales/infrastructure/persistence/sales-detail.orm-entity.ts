import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SalesOrmEntity } from './sales.orm-entity';

@Entity('t_sales_dets')
export class SalesDetailOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  salesId: number;

  @Column()
  productId: number;

  @Column('decimal')
  listPrice: number;

  @Column()
  quantity: number;

  @Column('decimal')
  discountPercentage: number;

  @Column('decimal')
  discountValue: number;

  @Column('decimal')
  priceAfterDiscount: number;

  @Column('decimal')
  total: number;

  @ManyToOne(() => SalesOrmEntity, sales => sales.details)
  @JoinColumn({ name: 'salesId' })
  sales: SalesOrmEntity;
}