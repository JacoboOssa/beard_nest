import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dtos/create-comment.dto';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  const mockComment = {
    id: '1',
    content: 'This is a comment',
    customer: { id: 'user_1', name: 'John Doe' },
    product: { id: 'product_1', name: 'Sample Product' },
  };

  const mockCommentsService = {
    create: jest.fn().mockResolvedValue(mockComment),
    findAll: jest.fn().mockResolvedValue([mockComment]),
    findOne: jest.fn().mockResolvedValue(mockComment),
    update: jest.fn().mockResolvedValue({ ...mockComment, content: 'Updated Comment' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        { provide: CommentsService, useValue: mockCommentsService },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new comment', async () => {
    const commentDto: CreateCommentDTO = { 
      content: 'This is a comment', 
      customerId: 'user_1', 
      productId: 'product_1',
      stars: 5, 
    };
    expect(await controller.create(commentDto)).toEqual(mockComment);
    expect(service.create).toHaveBeenCalledWith(commentDto);
  });

  it('should return all comments', async () => {
    expect(await controller.findAll()).toEqual([mockComment]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a comment by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockComment);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a comment', async () => {
    const commentDto: CreateCommentDTO = { 
      content: 'Updated Comment', 
      customerId: 'user_1', 
      productId: 'product_1',
      stars: 5, 
    };
    expect(await controller.update('1', commentDto)).toEqual({ ...mockComment, content: 'Updated Comment' });
    expect(service.update).toHaveBeenCalledWith('1', commentDto);
  });

  it('should delete a comment', async () => {
    expect(await controller.delete('1')).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
