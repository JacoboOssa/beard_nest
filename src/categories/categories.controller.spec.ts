import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';  // Assuming the path is correct
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;
  let cloudinaryService: CloudinaryService;

  const mockCategory = { 
    id: '1', 
    name: 'Electronics',
    url_image: 'image-url',
    slug: 'electronics',
  };

  const mockCategoriesService = {
    create: jest.fn().mockResolvedValue(mockCategory),
    findAll: jest.fn().mockResolvedValue([mockCategory]),
    findOne: jest.fn().mockResolvedValue(mockCategory),
  };

  const mockCloudinaryService = {
    uploadImage: jest.fn().mockResolvedValue({ url: 'image-url' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        { provide: CategoriesService, useValue: mockCategoriesService },
        { provide: CloudinaryService, useValue: mockCloudinaryService }, 
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

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should create a category', async () => {
  //   const createCategoryDto = { 
  //     id: '1', 
  //     name: 'Electronics',
  //     url_image: 'image-url',
  //     slug: 'electronics', 
  //   };
  //   expect(await controller.create(createCategoryDto)).toEqual(mockCategory);
  //   expect(service.create).toHaveBeenCalledWith(createCategoryDto);
  // });

  it('should return all categories', async () => {
    expect(await controller.findAll()).toEqual([mockCategory]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a category by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockCategory);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});
