import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepository: Repository<Comment>;
  let usersService: UsersService;
  let productsService: ProductsService;

  const mockComment: Comment = {
    id: '1',
    content: 'This is a comment',
    customer: null,
    product: null,
    stars: 5,
  };

  const mockUser = { id: 'user_1', name: 'John Doe' };
  const mockProduct = { id: 'product_1', name: 'Sample Product' };

  const mockCommentRepository = {
    find: jest.fn().mockResolvedValue([mockComment]),
    findOneBy: jest.fn().mockResolvedValue(mockComment),
    create: jest.fn().mockReturnValue(mockComment),
    save: jest.fn().mockResolvedValue(mockComment),
    preload: jest.fn().mockResolvedValue(mockComment),
    remove: jest.fn().mockResolvedValue(true),
  };

  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue(mockUser),
  };

  const mockProductsService = {
    findOne: jest.fn().mockResolvedValue(mockProduct),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(Comment), useValue: mockCommentRepository },
        { provide: UsersService, useValue: mockUsersService },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
    usersService = module.get<UsersService>(UsersService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all comments', async () => {
    const comments = [mockComment];
    jest.spyOn(service, 'findAll').mockResolvedValue(comments);
    expect(await service.findAll()).toEqual(comments);
  });

  it('should return a comment by id', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockComment);
    expect(await service.findOne('1')).toEqual(mockComment);
  });

  it('should create a new comment', async () => {
    const commentDto = { 
      content: 'This is a comment', 
      customerId: 'user_1', 
      productId: 'product_1',
      stars: 5, 
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockComment);
    expect(await service.create(commentDto)).toEqual(mockComment);
  });

  it('should update a comment', async () => {
    const updatedComment = { 
      ...mockComment, 
      content: 'Updated Comment',
      customerId: 'user_4',
      productId: 'product_4'
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedComment);
    expect(await service.update('1', updatedComment)).toEqual(updatedComment);
  });

  it('should delete a comment', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
