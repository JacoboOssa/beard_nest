import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { UsersService } from '../users/users.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderRepository: Repository<Order>;
  let usersService: UsersService;

  const mockOrder: Order = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    day: 1,
    month: 1,
    year: 2024,
    order_status: 'PENDING',
    customer: null,
    amount: 100,
    shipping_address: '123 Main St',
    order_address: '123 Main St'
  };

  const mockCustomer = { id: 'customer_1', name: 'John Doe' };

  const mockOrderRepository = {
    find: jest.fn().mockResolvedValue([mockOrder]),
    findOneBy: jest.fn().mockResolvedValue(mockOrder),
    create: jest.fn().mockReturnValue(mockOrder),
    save: jest.fn().mockResolvedValue(mockOrder),
    preload: jest.fn().mockResolvedValue(mockOrder),
    remove: jest.fn().mockResolvedValue(true),
  };

  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue(mockCustomer),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: getRepositoryToken(Order), useValue: mockOrderRepository },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderRepository = module.get<Repository<Order>>(getRepositoryToken(Order));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all orders', async () => {
    const orders = [mockOrder];
    jest.spyOn(service, 'findAll').mockResolvedValue(orders);
    expect(await service.findAll()).toEqual(orders);
  });

  it('should return an order by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrder);
    expect(await service.findOne('1')).toEqual(mockOrder);
  });

  it('should create a new order', async () => {
    const orderDto = {
      customer_id: 'customer_1', 
      items: [],
      amount: 100,
      shipping_address: '123 Main St',
      order_address: '123 Main St' 
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockOrder);
    expect(await service.create(orderDto)).toEqual(mockOrder);
  });

  it('should update an order', async () => {
    const updatedOrder = { ...mockOrder, order_status: 'COMPLETED' };
    jest.spyOn(service, 'update').mockResolvedValue(updatedOrder);
    expect(await service.update('1', updatedOrder)).toEqual(updatedOrder);
  });

  it('should delete an order', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
