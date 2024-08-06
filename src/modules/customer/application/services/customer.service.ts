import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/repositories/customer.repository.interface';
import { Customer } from '../../domain/entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('ICustomerRepository')
    private customerRepository: ICustomerRepository
  ) {
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer(createCustomerDto.code, createCustomerDto.name, createCustomerDto.telp);
    return this.customerRepository.create(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID "${id}" not found`);
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const existingCustomer = await this.findOne(id);
    const updatedCustomer = { ...existingCustomer, ...updateCustomerDto };
    return this.customerRepository.update(id, updatedCustomer);
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.remove(id);
  }
}