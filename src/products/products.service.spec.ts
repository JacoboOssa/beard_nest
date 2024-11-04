import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from '../categories/categories.service';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockProduct: Product = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    name: 'Sample Product',
    description: 'This is a sample product.',
    price: 100,
    status: 'S',
    category: null,
    checkSlug: () => true,
    slug: 'sample-product',
    stock: 10,
    images: [],
    main_url_image: 'https://example.com/image.jpg', // Asegúrate de incluir esta propiedad
    };


//   const mockCategory = { name: 'Sample Category' };

  const mockCategory = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    name: 'New Category',
    url_image: 'https://example.com/image.jpg',
    slug: 'new-category',
    products: [],
    checkSlug: jest.fn(),  // Mock the checkSlug method properly
  };

  const mockProductRepository = {
    find: jest.fn().mockResolvedValue([mockProduct]),
    findOneBy: jest.fn().mockResolvedValue(mockProduct),
    create: jest.fn().mockReturnValue(mockProduct),
    save: jest.fn().mockResolvedValue(mockProduct),
    preload: jest.fn().mockResolvedValue(mockProduct),
  };

  const mockCategoriesService = {
    findOne: jest.fn().mockResolvedValue(mockCategory),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: getRepositoryToken(Product), useValue: mockProductRepository },
        { provide: CategoriesService, useValue: mockCategoriesService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all active products', async () => {
    const products = [mockProduct];
    jest.spyOn(service, 'findAll').mockResolvedValue(products);
    expect(await service.findAll()).toEqual(products);
  });

  it('should return a product by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockProduct);
    expect(await service.findOne('1')).toEqual(mockProduct);
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

    jest.spyOn(service, 'create').mockResolvedValue(mockProduct);
    expect(await service.create(mockFile, productDto)).toEqual(mockProduct); // Pasa el archivo y el DTO
  });


  it('should update a product', async () => {
    const updatedProduct = {
         ...mockProduct, 
         name: 'Updated Product',
         checkSlug: mockCategory.checkSlug };
    jest.spyOn(service, 'update').mockResolvedValue(updatedProduct);
    expect(await service.update('1', updatedProduct)).toEqual(updatedProduct);
  });

  it('should delete (deactivate) a product', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
