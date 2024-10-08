import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ProductsService } from '../products/products.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: getRepositoryToken(Image),  // Mock ImageRepository
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: CloudinaryService,  // Mock CloudinaryService
          useValue: {
            uploadImage: jest.fn(),
            deleteImage: jest.fn(),
          },
        },
        {
          provide: ProductsService,  // Mock ProductsService
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create image and return data', async () => {
    const mockFiles = [{
      fieldname: 'image',
      originalname: 'test.png',
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from(''),
      size: 1024,
      stream : null,
      destination: '',
      filename: 'test.png',
      path: 'test.png'
    }];
    const productId = '123';  // Example productId

    const result: Image[] = [{ id: "1", url_img: 'image-url', product: null }];  // Mock Image entity result

    jest.spyOn(service, 'create').mockResolvedValue(result);  // Use 'create' method with correct arguments

    expect(await service.create(mockFiles, productId)).toEqual(result);  // Pass both arguments
  });
});

