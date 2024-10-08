import { Test, TestingModule } from '@nestjs/testing';
import { BlogsService } from './blogs.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

describe('BlogsService', () => {
  let service: BlogsService;
  let blogRepository: Repository<Blog>;

  const mockBlog: Blog = {
    id: '20079a84-d3dd-48fa-8195-f0f9344d9fac',
    title: 'Sample Blog',
    slug: 'sample-blog',
    content: 'This is a sample blog.',
    status: 'S',
    date: new Date(),
    checkSlug: () => true
  };

  const mockBlogRepository = {
    find: jest.fn().mockResolvedValue([mockBlog]),
    findOneBy: jest.fn().mockResolvedValue(mockBlog),
    create: jest.fn().mockReturnValue(mockBlog),
    save: jest.fn().mockResolvedValue(mockBlog),
    preload: jest.fn().mockResolvedValue(mockBlog),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogsService,
        { provide: getRepositoryToken(Blog), useValue: mockBlogRepository },
      ],
    }).compile();

    service = module.get<BlogsService>(BlogsService);
    blogRepository = module.get<Repository<Blog>>(getRepositoryToken(Blog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all active blogs', async () => {
    const blogs = [mockBlog];
    jest.spyOn(service, 'findAll').mockResolvedValue(blogs);
    expect(await service.findAll()).toEqual(blogs);
  });

  it('should return a blog by slug', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(mockBlog);
    expect(await service.findOne('sample-blog')).toEqual(mockBlog);
  });

  it('should create a blog', async () => {
    const blogDto = { title: 'Sample Blog', slug: 'sample-blog', content: 'This is a sample blog.', status: 'S' };
    jest.spyOn(service, 'create').mockResolvedValue(mockBlog);
    expect(await service.create(blogDto)).toEqual(mockBlog);
  });

  it('should update a blog', async () => {
    const updatedBlog = { 
      ...mockBlog,
      title: 'Updated Blog',
      checkSlug: () => true};
    jest.spyOn(service, 'update').mockResolvedValue(updatedBlog);
    expect(await service.update('1', updatedBlog)).toEqual(updatedBlog);
  });

  it('should delete (deactivate) a blog', async () => {
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    expect(await service.delete('1')).toBeUndefined();
  });
});
