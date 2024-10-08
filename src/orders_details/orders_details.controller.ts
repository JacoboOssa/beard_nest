import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';
import { CreateOrderDetailsDTO } from './dtos/create-order-details.dto';  // Assuming this DTO exists
import { UpdateOrderDetailsDTO } from './dtos/update-order-details.dto';  // Assuming this DTO exists
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersDetailsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersDetailsService.findOne(id);
  }

  @Post()
  create(@Body() createOrderDetailsDto: CreateOrderDetailsDTO) {
    return this.ordersDetailsService.create(createOrderDetailsDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDetailsDto: UpdateOrderDetailsDTO,
  ) {
    return this.ordersDetailsService.update(id, updateOrderDetailsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersDetailsService.remove(id);
  }
}
