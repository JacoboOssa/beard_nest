import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Post()
  create(@Body() createOrderDTO: CreateOrderDTO) {
    return this.ordersService.create(createOrderDTO);
  }

  @Auth(ValidRoles.admin)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDTO: UpdateOrderDTO) {
    return this.ordersService.update(id,updateOrderDTO);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
