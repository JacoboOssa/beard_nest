import { Controller, Post } from '@nestjs/common';
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
}
