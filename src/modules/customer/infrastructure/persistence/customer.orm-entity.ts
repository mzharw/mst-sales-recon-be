import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}