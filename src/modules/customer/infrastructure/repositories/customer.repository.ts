import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerOrmEntity } from '../persistence/customer.orm-entity';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';
import { Customer } from '../../domain/entities/customer.entity';

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectRepository(CustomerOrmEntity)
    private readonly ormRepository: Repository<CustomerOrmEntity>,
  ) {
  }

  async create(customer: Customer): Promise<Customer> {
    const ormEntity = this.toOrmEntity(customer);
    const savedEntity = await this.ormRepository.save(ormEntity);
    return this.toDomainEntity(savedEntity);
  }

  async findAll(): Promise<Customer[]> {
    const ormEntities = await this.ormRepository.find();
    return ormEntities.map(entity => this.toDomainEntity(entity));
  }

  async findById(id: number): Promise<Customer> {
    const ormEntity = await this.ormRepository.findOne({ where: { id } });
    return ormEntity ? this.toDomainEntity(ormEntity) : null;
  }

  async update(id: number, customerData: Partial<Customer>): Promise<Customer> {
    await this.ormRepository.update(id, customerData);
    const updated = await this.ormRepository.findOne({ where: { id } });
    return this.toDomainEntity(updated);
  }

  async remove(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }

  private toDomainEntity(ormEntity: CustomerOrmEntity): Customer {
    const customer = new Customer(ormEntity.code, ormEntity.name, ormEntity.telp);
    customer.id = ormEntity.id;
    return customer;
  }

  private toOrmEntity(customer: Customer): CustomerOrmEntity {
    const ormEntity = new CustomerOrmEntity();
    ormEntity.id = customer.id;
    ormEntity.code = customer.code;
    ormEntity.name = customer.name;
    ormEntity.telp = customer.telp;
    return ormEntity;
  }
}