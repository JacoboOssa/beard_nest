import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';

describe('CommentsService', () => {
  let service: CommentsService;
  let controller: CommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    controller = module.get<CommentsController>(CommentsController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    it('should create a comment', async () => {

      const mockCustomer = {
        id: "4a6d3e85-9559-4f53-af7e-e0955bef10a5",
        name: "Carlos",
        lastname: "González",
        email: "carlos.gonzalez@example.com",
        roles: ["user"],
        status: "S",
        bilingAddress: null,
        shippingAddress: "Calle 12 # 34-56, Cali",
        phone: "+57 3001234567",
        country: "Colombia",
        city: "Cali"
      }

      const mockProduct = {
        id: "32cd75b6-13fd-4014-955d-6af8485a46fc",
        slug: "cepillo-para-barba-larga",
        name: "Cepillo para barba larga",
        price: 29.99, // Cambiado a número
        description: "Un cepillo una chimba",
        stock: 100,
        status: "S"
      }

      const result = {
        id: 'some-comment-id',
        content: 'sdasas',
        stars: 5,
        customer: mockCustomer,
        product: mockProduct
      };
  
      // Usar mockResolvedValue para simular una promesa que resuelve el resultado
      jest.spyOn(service, 'create').mockResolvedValue(result);
  
      const testInput = {
        content: 'Great product!',
        stars: 5,
        customerId: '1df7dc3d-93e6-434e-8609-bd713a13264b', 
        productId: '1df7dc3d-93e6-434e-8609-bd713a13264b',  
      };
      
      // Llamar al controlador y verificar el resultado
      expect(await controller.create(testInput)).toEqual(result);
    });
  });
  
});
