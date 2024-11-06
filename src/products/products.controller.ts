import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Auth(ValidRoles.admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile(
    new ParseFilePipe({
      validators:[
        new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'}),
      ]
    }),
  ) file: Express.Multer.File,
  @Body() createProductDTO: CreateProductDTO) {
    return this.productsService.create(file,createProductDTO);
  }

  //@Auth(ValidRoles.admin, ValidRoles.user)
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 3,
  ) {
    const [results,total]= await this.productsService.findAll(limit, (page - 1) * limit);
    return { 
      data: results,
      total
     };
  }

  
  @Get('id/:id')
  findOne(@Param('id') id: string ) {
    return this.productsService.findOne(id);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.productsService.findOneBySlug(slug);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productsService.update(id, updateProductDTO);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  @Auth(ValidRoles.admin)
  @Delete('slug/:slug')
  deleteBySlug(@Param('slug') slug: string) {
    return this.productsService.deleteBySlug(slug);
  }

}
