import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
    constructor (@InjectRepository (Cart) private readonly cartRepository: Repository<Cart>){
    }

    // istanbul ignore next
    async create(){
        const cart = this.cartRepository.create();
        await this.cartRepository.save(cart);
        return cart;
    }

    async findOne(id: string){
        const cart = await this.cartRepository.findOneBy({id});
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    async deleteByIdCart(cartId: string) {
        try {
          // Load the cart with its items
          const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: ['items'],
          });
    
          if (!cart) {
            throw new Error(`Cart with ID ${cartId} not found`);
          }
    
          // If the cart has items, delete them by their IDs
          if (cart.items.length > 0) {
            await this.cartRepository
              .createQueryBuilder()
              .delete()
              .from('CartItem')
              .where("id IN (:...itemIds)", { itemIds: cart.items.map(item => item.id) })
              .execute();
          }
    
          return { message: `All items in cart with ID ${cartId} have been deleted` };
        } catch (err) {
          return { error: err.message };
        }
    }
}
