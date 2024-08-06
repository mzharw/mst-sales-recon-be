import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('m_products')
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 10 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}