  import { Body, Controller, Delete, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
  import { CategoriesService } from './categories.service';
  import { CreateCategoryDTO } from './dtos/create-category.dto';
  import { UpdateCategoryDTO } from './dtos/update-category.dto';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService,
      private readonly cloudinaryService: CloudinaryService) {}

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
    @Body() createCategoryDTO: CreateCategoryDTO){
      return this.categoriesService.create(file,createCategoryDTO);
    }

    /*
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(
      @UploadedFile(
        new ParseFilePipe({
          validators:[
            new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
            new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'}),
          ]
        }),
      ) file: Express.Multer.File) {
        return this.cloudinaryService.uploadFile(file);
      }
        */

    @Patch()
    update(@Body() updateCategoryDTO: UpdateCategoryDTO){
      return this.categoriesService.update(updateCategoryDTO);
    }

    @Delete(':id')
    delete(@Param ('id') id: string){
      return this.categoriesService.delete(id);
    }

    @Get()
    findAll(){
      return this.categoriesService.findAll();
    }

    @Get(':slug')
    findOne(@Param('slug') slug: string){
      return this.categoriesService.findOne(slug);
    }
  }
