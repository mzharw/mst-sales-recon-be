import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { SalesDetailOrmEntity } from './sales-detail.orm-entity';
import { CustomerOrmEntity } from '../../../customer/infrastructure/persistence/customer.orm-entity';

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

  @Column('decimal', { precision: 18, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 18, scale: 2 })
  discount: number;

  @Column('decimal', { precision: 18, scale: 2 })
  shippingCost: number;

  @Column('decimal', { precision: 18, scale: 2 })
  totalPayment: number;

  @OneToMany(() => SalesDetailOrmEntity, detail => detail.sales)
  details: SalesDetailOrmEntity[];

  @ManyToOne(() => CustomerOrmEntity, customers => customers.sales)
  @JoinColumn({ name: 'customerId' })
  customers: CustomerOrmEntity;
}