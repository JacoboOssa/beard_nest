import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDTO } from './dtos/create-product.dto';
import { CategoriesService } from '../categories/categories.service';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService) {}

    // istanbul ignore next
    async findAll() {
        return await this.productRepository.find({ where: { status: 'S' } });
    }

    // istanbul ignore next
    async findOne(id: string) {
        const product = await this.productRepository.findOneBy({id});
        if (!product || product.status !== 'S') {
            throw new NotFoundException('Product not found or inactive');
        }
        return product;
    }

    // istanbul ignore next
    async create(createProductoDTO: CreateProductDTO) {
        const category = await this.categoriesService.findOne(createProductoDTO.categoryId)
        // si no existe la categoria, se lanza una excepcion, ahi que
        const product = this.productRepository.create({
            ...createProductoDTO,
            status: 'S',
            category: category
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
