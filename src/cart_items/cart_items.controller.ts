import { Body, Controller, Post } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CreateCartItemsDTO } from './dtos/create-cart-items.dto';
import { Auth } from 'src/users/decorators/auth.decorator';
import { ValidRoles } from 'src/users/interfaces/valid-roles';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Post()
  create(@Body() createCartItemDTO: CreateCartItemsDTO) {
    return this.cartItemsService.create(createCartItemDTO);
  }
}
