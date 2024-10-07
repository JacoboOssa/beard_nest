import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dtos/create-comment.dto';

import { Auth } from 'src/users/decorators/auth.decorator';
import { ValidRoles } from 'src/users/interfaces/valid-roles';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Post()
  create(@Body() createCommentDTO: CreateCommentDTO) {
    return this.commentsService.create(createCommentDTO);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(id);
  }
  
  @Auth(ValidRoles.admin, ValidRoles.user)
  @Patch(':id')
  update(@Param('id') id: string, @Body() createCommentDTO: CreateCommentDTO) {
    return this.commentsService.update(id, createCommentDTO);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }




}
