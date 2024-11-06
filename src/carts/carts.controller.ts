import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Post()
  create(){
    return this.cartsService.create();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.cartsService.findOne(id);
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Delete(':cartId')
  deleteByIdCart(@Param('cartId') cartId: string){
    return this.cartsService.deleteByIdCart(cartId);
  }

}
