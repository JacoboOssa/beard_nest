import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
    constructor(@InjectRepository (Comment) private readonly commentRepository: Repository<Comment>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService) {}

    // istanbul ignore next
    async findAll() {
        return await this.commentRepository.find();
    }

    // istanbul ignore next
    async findOne(id: string){
        const comment = await this.commentRepository.findOneBy({id});
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        return comment;
    }

    // istanbul ignore next
    async create(createCommentDTO: CreateCommentDTO) {
        const user = await this.userService.findOne(createCommentDTO.customerId);
        const product = await this.productService.findOne(createCommentDTO.productId);
        const comment = this.commentRepository.create({
            ...createCommentDTO,
            customer: user,
            product: product
        });
        await this.commentRepository.save(comment);
        return comment;
    }

    // istanbul ignore next
    async update(id: string, createCommentDTO: CreateCommentDTO) {
        const comment = await this.commentRepository.preload({
            id: id,
            ...createCommentDTO,
        });
        if (!comment) {
            throw new NotFoundException('Comment not found');
        }
        await this.commentRepository.save(comment);
        return comment;
    }

    // istanbul ignore next
    async delete(id: string) {
        try{
            const comment = await this.findOne(id);
            if (!comment) {
                throw new NotFoundException('Comment not found');
            }
            await this.commentRepository.remove(comment);
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Product already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}
