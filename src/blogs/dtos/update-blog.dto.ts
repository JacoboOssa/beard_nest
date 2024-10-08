import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDTO } from './create-blog.dto';

export class UpdateBlogDTO extends PartialType(CreateBlogDTO) {
    public  readonly id?: string;
}