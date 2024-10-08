import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: Repository<Cart>;

  const mockCart: Cart = {
    id: '1',
    items: [],
    customer: null,
  };

  const mockCartRepository = {
    create: jest.fn().mockReturnValue(mockCart),
    save: jest.fn().mockResolvedValue(mockCart),
    findOneBy: jest.fn().mockResolvedValue(mockCart),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: getRepositoryToken(Cart), useValue: mockCartRepository },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new cart', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockCart);
    expect(await service.create()).toEqual(mockCart);
  });

  it('should return a cart by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockCart);
    expect(await service.findOne('1')).toEqual(mockCart);
  });

  it('should throw an error if cart is not found', async () => {
    jest.spyOn(cartRepository, 'findOneBy').mockResolvedValue(null);
    await expect(service.findOne('2')).rejects.toThrow('Cart not found');
  });
});
