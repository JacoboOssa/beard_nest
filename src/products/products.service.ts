import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoriesService } from '../categories/categories.service';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { PaginationDto } from 'src/common/dto/pagination.dto';



@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly cloudinaryService: CloudinaryService) { }

    // istanbul ignore next
    async findAll(limit: number, offset: number) {
        const [results,total]= await this.productRepository.findAndCount(
            {
                where: {status: 'S'},
                take: limit,
                skip: offset,
            }
        )
        return [results,total];
    }

    // istanbul ignore next
    async findOne(id: string) {
        const product = await this.productRepository.findOneBy({id});
        if (!product || product.status !== 'S') {
            throw new NotFoundException('Product not found or inactive');
        }
        return product  ;
    }

    async findOneBySlug(slug: string) {
        const product = await this.productRepository.findOneBy({slug});
        if (!product || product.status !== 'S') {
            throw new NotFoundException('Product not found or inactive');
        }
        return product;
    }



    // istanbul ignore next
    async create(file: Express.Multer.File, createProductoDTO: CreateProductDTO) {
        const res = await this.cloudinaryService.uploadFile(file)
        const category = await this.categoriesService.findOne(createProductoDTO.categoryId)
        const product = this.productRepository.create({
            main_url_image: res.secure_url,
            ...createProductoDTO,
            status: 'S',
            category: category,
        });
        await this.productRepository.save(product);
        return product;
    }

    // istanbul ignore next
    async update(id: string, updateProductDTO: UpdateProductDTO) {
        const product = await this.productRepository.preload({
            id: id,
            ...updateProductDTO,
        });
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        try {
            await this.productRepository.save(product);
            return product;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    async delete(id: string) {
        try {
            const product = await this.findOne(id);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            product.status = 'N';
            await this.productRepository.save(product);
        } catch (error) {
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
