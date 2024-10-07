import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrder = {
    id: '1',
    day: 1,
    month: 1,
    year: 2024,
    order_status: 'PENDING',
    customer: null,
  };

  const mockOrdersService = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findOne: jest.fn().mockResolvedValue(mockOrder),
    update: jest.fn().mockResolvedValue({ ...mockOrder, amount: 150 }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        { provide: OrdersService, useValue: mockOrdersService },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new order', async () => {
    const createOrderDto = {
      customer_id: 'customer_1', 
      items: [],
      amount: 100,
      shipping_address: '123 Main St',
      order_address: '123 Main St'
    };
    expect(await controller.create(createOrderDto)).toEqual(mockOrder);
    expect(service.create).toHaveBeenCalledWith(createOrderDto);
  });


  it('should return all orders', async () => {
    expect(await controller.findAll()).toEqual([mockOrder]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return an order by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockOrder);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update an order', async () => {
    const updateOrderDto = { amount: 150 };  // Updated with correct fields
    expect(await controller.update('1', updateOrderDto)).toEqual({
      ...mockOrder,
      amount: 150,
    });
    expect(service.update).toHaveBeenCalledWith('1', updateOrderDto);
  });

  it('should delete an order', async () => {
    expect(await controller.delete('1')).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
