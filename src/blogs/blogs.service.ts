import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDTO } from './dtos/create-blog.dto';
import { UpdateBlogDTO } from './dtos/update-blog.dto';

@Injectable()
export class BlogsService {
    constructor (@InjectRepository(Blog) private readonly blogRepository: Repository<Blog>){}
     
    // istanbul ignore next
    async findAll(){
        return await this.blogRepository.find({ where: { status: 'S' } }); // Solo blogs activos
    }

    // istanbul ignore next
    async findOne(slug: string){
        const blog = await this.blogRepository.findOneBy({ slug });
        if (!blog || blog.status !== 'S') { 
            throw new NotFoundException('Blog not found or inactive');
        }
        return blog;    
    }

    // istanbul ignore next
    async create (createBlogDTO: CreateBlogDTO){
        const blog = this.blogRepository.create({
            ...createBlogDTO,
            status: 'S' 
        });
        await this.blogRepository.save(blog);
        return blog;
    }

    // istanbul ignore next
    async update(id: string, updateBlogDTO: UpdateBlogDTO){
        const blog = await this.blogRepository.preload({
            id: id,
            ...updateBlogDTO
        });

        if(!blog){
            throw new NotFoundException('Blog not found')
        }
        try{
            await this.blogRepository.save(blog);
            return blog;
        } catch (error){
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    async delete(id: string) {
        try {
            const blog = await this.findOne(id); // Verifica que el blog esté activo
            if (!blog) {
                throw new NotFoundException('Blog not found');
            }
            blog.status = 'N'; // Actualiza el status a 'N' para marcarlo como inactivo
            await this.blogRepository.save(blog); // Guarda el cambio en la base de datos
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Blog already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}
