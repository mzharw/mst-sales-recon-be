import { Customer } from '../entities/customer.entity';

export interface ICustomerRepository {
  create(customer: Customer): Promise<Customer>;
  findAll(): Promise<Customer[]>;
  findById(id: number): Promise<Customer>;
  update(id: number, customer: Partial<Customer>): Promise<Customer>;
  remove(id: number): Promise<void>;
}