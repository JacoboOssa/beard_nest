import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.productsService.findOne(id);
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

}
