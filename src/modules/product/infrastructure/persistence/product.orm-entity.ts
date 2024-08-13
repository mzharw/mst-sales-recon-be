import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { SalesDetailOrmEntity } from '../../../sales/infrastructure/persistence/sales-detail.orm-entity';

@Entity('m_products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  @Index({ unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 18, scale: 2 })
  price: number;

  @OneToMany(() => SalesDetailOrmEntity, sales => sales.products)
  sales?: SalesDetailOrmEntity[];
}