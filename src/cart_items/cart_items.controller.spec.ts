import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsController } from './cart_items.controller';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemsDTO } from './dtos/create-cart-items.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';

describe('CartItemsController', () => {
  let controller: CartItemsController;
  let service: CartItemsService;

  const mockCartItem = {
    id: '1',
    quantity: 2,
    product: { id: 'product_1', name: 'Sample Product' },
    cart: { id: 'cart_1' },
  };

  const mockCartItemsService = {
    create: jest.fn().mockResolvedValue(mockCartItem),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemsController],
      providers: [
        { provide: CartItemsService, useValue: mockCartItemsService },
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

    controller = module.get<CartItemsController>(CartItemsController);
    service = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new cart item', async () => {
    const cartItemDto: CreateCartItemsDTO = {
      productId: 'product_1',
      cartId: 'cart_1',
      quantity: 2,
      total: 200,
    };

    expect(await controller.create(cartItemDto)).toEqual(mockCartItem);
    expect(service.create).toHaveBeenCalledWith(cartItemDto);
  });
});
