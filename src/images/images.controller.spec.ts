import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

describe('ImagesController', () => {
  let controller: ImagesController;
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,  // Mock ImagesService
          useValue: {
            create: jest.fn(),  // Mock create method
            remove: jest.fn(),  // Mock remove method (or whatever delete logic exists)
          },
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an image', async () => {
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
    const result = [{ id: "1", url_img: 'image-url', product: null }];  // Mock Image entity result
    // const result = [{ id: "1", url_img: 'image-url', product: {} }];  // Mocked result from service

    jest.spyOn(service, 'create').mockResolvedValue(result);  // Spy on the service method

    const response = await controller.create(mockFiles, productId);
    expect(response).toEqual(result);  // Expect the controller's output to match the mocked service response
    expect(service.create).toHaveBeenCalledWith(mockFiles, productId);  // Ensure the service method was called with the correct arguments
  });

});
