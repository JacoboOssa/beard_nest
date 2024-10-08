import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';

describe('CartsController', () => {
  let controller: CartsController;
  let service: CartsService;

  const mockCart: Cart = {
    id: '1',
    items: [],
    customer: null,
  };

  const mockCartsService = {
    create: jest.fn().mockResolvedValue(mockCart),
    findOne: jest.fn().mockResolvedValue(mockCart),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        { provide: CartsService, useValue: mockCartsService },
        JwtService,
      ],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: jest.fn(() => true),
    })
    .compile();

    controller = module.get<CartsController>(CartsController);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cart', async () => {
    expect(await controller.create()).toEqual(mockCart);
    expect(service.create).toHaveBeenCalled();
  });

  it('should return a cart by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockCart);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw an error if cart not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error('Cart not found'));
    await expect(controller.findOne('2')).rejects.toThrow('Cart not found');
  });
});
