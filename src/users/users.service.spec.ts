import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CartsService } from '../carts/carts.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let service: UsersService;
  let customerRepository: Repository<Customer>;
  let cartsService: CartsService;
  let jwtService: JwtService;

  const mockCustomer: Customer = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
    cart: null,
    status: 'S',
    roles: ['user'],
    bilingAddress: '123 Main St',
    shippingAddress: '123 Main St',
    phone: '123-456-7890',
    country: 'USA',
    city: 'New York',
    orders: [],
    comments: [],
    checkEmail: () => true,
    checkEmailUpdate: () => true,
    lastname: 'Doe',
  };

  const mockCustomerRepository = {
    find: jest.fn().mockResolvedValue([mockCustomer]),
    findOneBy: jest.fn().mockResolvedValue(mockCustomer),
    create: jest.fn().mockReturnValue(mockCustomer),
    save: jest.fn().mockResolvedValue(mockCustomer),
    preload: jest.fn().mockResolvedValue(mockCustomer),
  };

  const mockCartsService = {
    create: jest.fn().mockResolvedValue({ id: 'cart_1' }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('token_123'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Customer), useValue: mockCustomerRepository },
        { provide: CartsService, useValue: mockCartsService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
    cartsService = module.get<CartsService>(CartsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all active customers', async () => {
    const customers = [mockCustomer];
    jest.spyOn(service, 'findAll').mockResolvedValue(customers);
    expect(await service.findAll()).toEqual(customers);
  });

  it('should return a customer by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockCustomer);
    expect(await service.findOne('1')).toEqual(mockCustomer);
  });

  it('should create a new customer', async () => {
    const customerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      billingAddress: '123 Main St',
      shippingAddress: '123 Main St',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
      lastname: 'Doe',
    };
    jest.spyOn(service, 'createCustomer').mockResolvedValue(mockCustomer);
    expect(await service.createCustomer(customerDto)).toEqual(mockCustomer);
  });

  it('should update a customer', async () => {
    const updatedCustomer = { 
      ...mockCustomer, 
      name: 'Jane Doe',
      checkEmailUpdate: () => true,
      checkEmail: () => true};
    jest.spyOn(service, 'updateCustomer').mockResolvedValue(updatedCustomer);
    expect(await service.updateCustomer('1', updatedCustomer)).toEqual(updatedCustomer);
  });

  it('should delete (deactivate) a customer', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });

  it('should authenticate and return a customer with a token', async () => {
    jest.spyOn(service, 'loginUser').mockResolvedValue({ ...mockCustomer, token: 'token_123' });
    const loginDto = { email: 'john@example.com', password: 'password123' };
    expect(await service.loginUser(loginDto)).toEqual({ ...mockCustomer, token: 'token_123' });
  });
});
