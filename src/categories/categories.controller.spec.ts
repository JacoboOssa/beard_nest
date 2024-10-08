import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategory: Category = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    name: 'New Category',
    url_image: 'https://example.com/image.jpg',
    slug: 'new-category',
    products: [],
    checkSlug: () => true,
  };

  const mockCategoriesService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
    update: jest.fn().mockResolvedValue({ ...mockCategory, name: 'Updated Category' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useValue: mockCategoriesService }],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a category', async () => {
    const categoryDto = { name: 'New Category', url_image: 'https://example.com/image.jpg' };
    expect(await controller.create(null, categoryDto)).toEqual(mockCategory);
    expect(service.create).toHaveBeenCalledWith(null, categoryDto);
  });

  it('should return all categories', async () => {
    expect(await controller.findAll()).toEqual([mockCategory]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a category by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockCategory);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  // it('should update a category', async () => {
  //   const updatedCategory = { ...mockCategory, name: 'Updated Category' };
  //   expect(await controller.update('1', updatedCategory)).toEqual(updatedCategory);
  //   expect(service.update).toHaveBeenCalledWith(updatedCategory);
  // });

  // it('should delete a category', async () => {
  //   expect(await controller.remove('1')).toBeUndefined();
  //   expect(service.delete).toHaveBeenCalledWith('1');
  // });
});
