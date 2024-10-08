import { Test, TestingModule } from '@nestjs/testing';
import { OrdersDetailsService } from './orders_details.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/order_detail.entity';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';  // Assuming this is the correct path

describe('OrdersDetailsService', () => {
  let service: OrdersDetailsService;
  let orderDetailRepository: Repository<OrderDetails>;
  let ordersService: OrdersService;
  let productsService: ProductsService;

  const mockOrderDetail: OrderDetails = {
    id: '1',
    product: null,  // Assuming the product is an object
    quantity: 2,
    price: 100,
    order: null,  // Assuming the order is an object
  };

  const mockOrderDetailRepository = {
    find: jest.fn().mockResolvedValue([mockOrderDetail]),
    findOneBy: jest.fn().mockResolvedValue(mockOrderDetail),
    create: jest.fn().mockReturnValue(mockOrderDetail),
    save: jest.fn().mockResolvedValue(mockOrderDetail),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockOrdersService = {
    findOne: jest.fn().mockResolvedValue({ id: 'order1', date: new Date() }),  // Mock for OrdersService
  };

  const mockProductsService = {
    findOne: jest.fn().mockResolvedValue({ id: 'prod1', name: 'Product 1' }),  // Mock for ProductsService
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersDetailsService,
        { provide: getRepositoryToken(OrderDetails), useValue: mockOrderDetailRepository },
        { provide: OrdersService, useValue: mockOrdersService },  // Mocking OrdersService
        { provide: ProductsService, useValue: mockProductsService },  // Mocking ProductsService
      ],
    }).compile();

    service = module.get<OrdersDetailsService>(OrdersDetailsService);
    orderDetailRepository = module.get<Repository<OrderDetails>>(getRepositoryToken(OrderDetails));
    ordersService = module.get<OrdersService>(OrdersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all order details with pagination', async () => {
    const paginationDto = { limit: 10, offset: 0 };
    jest.spyOn(service, 'findAll').mockResolvedValue([mockOrderDetail]);
    expect(await service.findAll(paginationDto)).toEqual([mockOrderDetail]);
    expect(service.findAll).toHaveBeenCalledWith(paginationDto);
  });

  it('should return an order detail by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockOrderDetail);
    expect(await service.findOne('1')).toEqual(mockOrderDetail);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should create a new order detail', async () => {
    const orderDetailDto = {
      productId: 'prod1',
      quantity: 2,
      orderId: 'order1',
      price: 100,
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockOrderDetail);
    expect(await service.create(orderDetailDto)).toEqual(mockOrderDetail);
    expect(service.create).toHaveBeenCalledWith(orderDetailDto);
  });

  it('should update an order detail', async () => {
    const updatedOrderDetail = { ...mockOrderDetail, quantity: 3 };
    jest.spyOn(service, 'update').mockResolvedValue(updatedOrderDetail);
    expect(await service.update('1', updatedOrderDetail)).toEqual(updatedOrderDetail);
    expect(service.update).toHaveBeenCalledWith('1', updatedOrderDetail);
  });

  it('should delete an order detail', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(true);
    expect(await service.remove('1')).toBe(true);
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
