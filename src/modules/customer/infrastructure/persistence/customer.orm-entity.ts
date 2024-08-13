import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { SalesOrmEntity } from '../../../sales/infrastructure/persistence/sales.orm-entity';

@Entity('m_customers')
export class CustomerOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  @Index({ unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  telp: string;

  @OneToMany(() => SalesOrmEntity, customer => customer.customers)
  sales?: SalesOrmEntity[];
}