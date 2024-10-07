import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryRepository: Repository<Category>;

  const mockCategory: Category = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    name: 'New Category',
    url_image: 'https://example.com/image.jpg',
    slug: 'new-category',
    products: [],
    checkSlug: jest.fn(),  // Mock the checkSlug method properly
  };

  const mockCategoryRepository = {
    find: jest.fn().mockResolvedValue([mockCategory]),
    findOneBy: jest.fn().mockResolvedValue(mockCategory),
    create: jest.fn().mockReturnValue(mockCategory),
    save: jest.fn().mockResolvedValue(mockCategory),
    preload: jest.fn().mockResolvedValue(mockCategory),
    remove: jest.fn().mockResolvedValue(true),
  };

  const mockCloudinaryService = {
    uploadFile: jest.fn().mockResolvedValue({ secure_url: 'https://example.com/image.jpg' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: getRepositoryToken(Category), useValue: mockCategoryRepository },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a category', async () => {
    const categoryDto = { name: 'New Category', url_image: 'https://example.com/image.jpg' };
    jest.spyOn(service, 'create').mockResolvedValue(mockCategory);
    expect(await service.create(null, categoryDto)).toEqual(mockCategory);
  });

  it('should return all categories', async () => {
    const categories = [mockCategory];
    jest.spyOn(service, 'findAll').mockResolvedValue(categories);
    expect(await service.findAll()).toEqual(categories);
  });

  it('should return a category by name', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory);
    expect(await service.findOne('New Category')).toEqual(mockCategory);
  });

  it('should update a category', async () => {
    const updatedCategory = { 
      ...mockCategory, 
      name: 'Updated Category',
      checkSlug: mockCategory.checkSlug  // Ensure checkSlug is included
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedCategory);
    expect(await service.update(updatedCategory)).toEqual(updatedCategory);
  });

  it('should delete a category', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
