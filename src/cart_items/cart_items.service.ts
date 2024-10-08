import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './entities/cart_item.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { CreateCartItemsDTO } from './dtos/create-cart-items.dto';
import { UpdateCartItemsDTO } from './dtos/update-cart-items.dto';
import { CartsService } from '../carts/carts.service';

@Injectable()
export class CartItemsService {
    constructor(@InjectRepository (CartItem) private cartItemsRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
    private readonly cartsService: CartsService) {}

    async findAll() {
        return await this.cartItemsRepository.find();
    }

    async findOne(id: string){
        const cartItem = await this.cartItemsRepository.findOneBy({id});
        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }
        return cartItem
    }

    async create(createCartItemDTO: CreateCartItemsDTO) {
        const product = await this.productsService.findOne(createCartItemDTO.productId);
        const cart = await this.cartsService.findOne(createCartItemDTO.cartId);
        const cartItem = this.cartItemsRepository.create({
            ...createCartItemDTO,
            product: product,
            cart: cart
        });
        await this.cartItemsRepository.save(cartItem);
        return cartItem;
    }

    async update(id: string, updateCartItemDTO: UpdateCartItemsDTO) {
        const cartItem = await this.cartItemsRepository.preload({
            id: id,
            ...updateCartItemDTO,
        });
        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }
        try {
            await this.cartItemsRepository.save(cartItem);
            return cartItem;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    async delete(id: string) {
        try {
            const cartItem = await this.findOne(id);
            if (!cartItem) {
                throw new NotFoundException('Cart item not found');
            }
            await this.cartItemsRepository.remove(cartItem);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Blog already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}

