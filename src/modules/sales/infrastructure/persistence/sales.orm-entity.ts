import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SalesDetailOrmEntity } from './sales-detail.orm-entity';

@Entity('t_sales')
export class SalesOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 15 })
  code: string;

  @Column('timestamp')
  date: Date;

  @Column()
  customerId: number;

  @Column('decimal')
  subtotal: number;

  @Column('decimal')
  discount: number;

  @Column('decimal')
  shippingCost: number;

  @Column('decimal')
  totalPayment: number;

  @OneToMany(() => SalesDetailOrmEntity, detail => detail.sales)
  details: SalesDetailOrmEntity[];
}