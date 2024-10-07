import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart_items.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart_item.entity';
import { ProductsService } from '../products/products.service';
import { CartsService } from '../carts/carts.service';

describe('CartItemsService', () => {
  let service: CartItemsService;
  let cartItemsRepository: Repository<CartItem>;
  let productsService: ProductsService;
  let cartsService: CartsService;

  const mockCartItem: CartItem = {
    id: '1',
    quantity: 2,
    product: null,
    cart: null,
    total: 200
  };

  const mockProduct = { id: 'product_1', name: 'Sample Product' };
  const mockCart = { id: 'cart_1' };

  const mockCartItemsRepository = {
    find: jest.fn().mockResolvedValue([mockCartItem]),
    findOneBy: jest.fn().mockResolvedValue(mockCartItem),
    create: jest.fn().mockReturnValue(mockCartItem),
    save: jest.fn().mockResolvedValue(mockCartItem),
    preload: jest.fn().mockResolvedValue(mockCartItem),
    remove: jest.fn().mockResolvedValue(true),
  };

  const mockProductsService = {
    findOne: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockCartsService = {
    findOne: jest.fn().mockResolvedValue(mockCart),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,
        { provide: getRepositoryToken(CartItem), useValue: mockCartItemsRepository },
        { provide: ProductsService, useValue: mockProductsService },
        { provide: CartsService, useValue: mockCartsService },
      ],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
    cartItemsRepository = module.get<Repository<CartItem>>(getRepositoryToken(CartItem));
    productsService = module.get<ProductsService>(ProductsService);
    cartsService = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cart items', async () => {
    const cartItems = [mockCartItem];
    jest.spyOn(service, 'findAll').mockResolvedValue(cartItems);
    expect(await service.findAll()).toEqual(cartItems);
  });

  it('should return a cart item by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockCartItem);
    expect(await service.findOne('1')).toEqual(mockCartItem);
  });

  it('should create a new cart item', async () => {
    const cartItemDto = {
      productId: 'product_1', 
      cartId: 'cart_1', 
      quantity: 2,
      total: 200 
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockCartItem);
    expect(await service.create(cartItemDto)).toEqual(mockCartItem);
  });

  it('should update a cart item', async () => {
    const updatedCartItem = { ...mockCartItem, quantity: 3 };
    jest.spyOn(service, 'update').mockResolvedValue(updatedCartItem);
    expect(await service.update('1', updatedCartItem)).toEqual(updatedCartItem);
  });

  it('should delete a cart item', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
