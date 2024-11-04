import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';
/*
describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const mockProduct = {
    id: '1',
    name: 'Sample Product',
    description: 'This is a sample product.',
    price: 100,
    stock: 10,
    status: 'S',
    category: null,
    images: [],
  };

  const mockProductsService = {
    findAll: jest.fn().mockResolvedValue([mockProduct]),
    findOne: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockResolvedValue(mockProduct),
    update: jest.fn().mockResolvedValue(mockProduct),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        { provide: ProductsService, useValue: mockProductsService },
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

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    expect(await controller.findAll()).toEqual([mockProduct]);
  });

  it('should return a product by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockProduct);
  });

  it('should create a product', async () => {
    const productDto = { 
        name: 'Sample Product', 
        description: 'This is a sample product.', 
        price: 100, 
        stock: 10, 
        categoryId: '1' 
    };
    const mockFile = {} as Express.Multer.File; // Crea un objeto vacío como un archivo simulado

    expect(await controller.create(mockFile, productDto)).toEqual(mockProduct); // Pasa el archivo y el DTO
  });


  it('should update a product', async () => {
    const updatedProduct = { ...mockProduct, name: 'Updated Product' };
    expect(await controller.update('1', updatedProduct)).toEqual(mockProduct);
  });

  it('should delete a product', async () => {
    expect(await controller.delete('1')).toBeUndefined();
  });
});
*/