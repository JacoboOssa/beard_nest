import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDetailsController } from './orders_details.controller';
import { OrdersDetailsService } from './orders_details.service';
import { CreateOrderDetailsDTO } from './dtos/create-order-details.dto';  // Assuming this is the DTO used

describe('OrdersDetailsController', () => {
  let controller: OrdersDetailsController;
  let service: OrdersDetailsService;

  const mockOrderDetail = {
    id: '1',
    product: { id: 'prod1', name: 'Product 1' },
    quantity: 2,
    price: 100,
    order: { id: 'order1', date: new Date() },
  };

  const mockOrdersDetailsService = {
    findAll: jest.fn().mockResolvedValue([mockOrderDetail]),
    findOne: jest.fn().mockResolvedValue(mockOrderDetail),
    create: jest.fn().mockResolvedValue(mockOrderDetail),
    update: jest.fn().mockResolvedValue({ ...mockOrderDetail, quantity: 3 }),
    remove: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersDetailsController],
      providers: [
        { provide: OrdersDetailsService, useValue: mockOrdersDetailsService },
      ],
    }).compile();

    controller = module.get<OrdersDetailsController>(OrdersDetailsController);
    service = module.get<OrdersDetailsService>(OrdersDetailsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all order details', async () => {
    expect(await controller.findAll({ limit: 10, offset: 0 })).toEqual([mockOrderDetail]);
    expect(service.findAll).toHaveBeenCalledWith({ limit: 10, offset: 0 });
  });

  it('should return a single order detail by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockOrderDetail);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a new order detail', async () => {
    const orderDetailDto: CreateOrderDetailsDTO = {
      productId: 'prod1',
      quantity: 2,
      orderId: 'order1',
      price: 100,
    };
    expect(await controller.create(orderDetailDto)).toEqual(mockOrderDetail);
    expect(service.create).toHaveBeenCalledWith(orderDetailDto);
  });

  it('should update an order detail', async () => {
    const updatedOrderDetail = { ...mockOrderDetail, quantity: 3 };
    expect(await controller.update('1', updatedOrderDetail)).toEqual(updatedOrderDetail);
    expect(service.update).toHaveBeenCalledWith('1', updatedOrderDetail);
  });

  it('should delete an order detail', async () => {
    expect(await controller.remove('1')).toBe(true);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
