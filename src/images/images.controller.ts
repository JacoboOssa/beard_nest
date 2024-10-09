import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Auth(ValidRoles.admin)
  @Post(':id')
  @UseInterceptors(FilesInterceptor('images', 10))
  create(@UploadedFiles(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) files: Express.Multer.File[],
    @Param('id') id: string) 
    { 
    return this.imagesService.create(files,id);
  }
}
