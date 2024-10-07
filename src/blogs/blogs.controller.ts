import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDTO } from './dtos/create-blog.dto';
import { UpdateBlogDTO } from './dtos/update-blog.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ValidRoles } from 'src/users/interfaces/valid-roles';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Auth(ValidRoles.admin)
  @Post()
  create(@Body() createBlogDTO: CreateBlogDTO){
    return this.blogsService.create(createBlogDTO);
  }

  @Auth(ValidRoles.admin)
  @Get()
  findAll(){
    return this.blogsService.findAll();
  }

  @Auth(ValidRoles.admin)
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.blogsService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDTO: UpdateBlogDTO){
    return this.blogsService.update(id, updateBlogDTO);
  } 

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string){
    return this.blogsService.delete(id);
  }

}
