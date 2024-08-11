import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SalesDetailOrmEntity } from '../../../sales/infrastructure/persistence/sales-detail.orm-entity';

@Entity('m_customers')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  telp: string;

  @OneToMany(() => SalesDetailOrmEntity, customer => customer.sales)
  sales: SalesDetailOrmEntity[];
}