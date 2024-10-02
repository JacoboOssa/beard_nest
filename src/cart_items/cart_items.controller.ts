import { Body, Controller, Post } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemsDTO } from './dtos/create-cart-items.dto';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  create(@Body() createCartItemDTO: CreateCartItemsDTO) {
    return this.cartItemsService.create(createCartItemDTO);
  }
}
