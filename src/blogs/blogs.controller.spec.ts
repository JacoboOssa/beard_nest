import { Test, TestingModule } from '@nestjs/testing';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { AuthGuard } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';

describe('BlogsController', () => {
  let controller: BlogsController;
  let service: BlogsService;

  const mockBlog = {
    id: '1',
    title: 'Sample Blog',
    slug: 'sample-blog',
    content: 'This is a sample blog.',
    status: 'S',
  };

  const mockBlogsService = {
    create: jest.fn().mockResolvedValue(mockBlog),
    findAll: jest.fn().mockResolvedValue([mockBlog]),
    findOne: jest.fn().mockResolvedValue(mockBlog),
    update: jest.fn().mockResolvedValue({ ...mockBlog, title: 'Updated Blog' }),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogsController],
      providers: [
        { provide: BlogsService, useValue: mockBlogsService },
        { provide: APP_GUARD, useValue: { canActivate: jest.fn(() => true) } }, // Mock AuthGuard
      ],
    }).compile();

    controller = module.get<BlogsController>(BlogsController);
    service = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a blog', async () => {
    const blogDto = { title: 'Sample Blog', slug: 'sample-blog', content: 'This is a sample blog.' };
    expect(await controller.create(blogDto)).toEqual(mockBlog);
    expect(service.create).toHaveBeenCalledWith(blogDto);
  });

  it('should return all blogs', async () => {
    expect(await controller.findAll()).toEqual([mockBlog]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a blog by id', async () => {
    expect(await controller.findOne('1')).toEqual(mockBlog);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a blog', async () => {
    const updatedBlogDto = { title: 'Updated Blog', content: 'Updated content' };
    expect(await controller.update('1', updatedBlogDto)).toEqual({ ...mockBlog, title: 'Updated Blog' });
    expect(service.update).toHaveBeenCalledWith('1', updatedBlogDto);
  });

  it('should delete a blog', async () => {
    expect(await controller.delete('1')).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
