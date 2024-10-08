import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
    constructor (@InjectRepository (Cart) private readonly cartRepository: Repository<Cart>){
    }

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
}
