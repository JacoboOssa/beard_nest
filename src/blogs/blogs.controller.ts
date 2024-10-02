import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDTO } from './dtos/create-blog.dto';
import { UpdateBlogDTO } from './dtos/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() createBlogDTO: CreateBlogDTO){
    return this.blogsService.create(createBlogDTO);
  }

  @Get()
  findAll(){
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDTO: UpdateBlogDTO){
    return this.blogsService.update(id, updateBlogDTO);
  } 

  @Delete(':id')
  delete(@Param('id') id: string){
    return this.blogsService.delete(id);
  }


}
