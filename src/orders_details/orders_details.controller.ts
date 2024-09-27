import { Controller } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';

@Controller('orders-details')
export class OrdersDetailsController {
  constructor(private readonly ordersDetailsService: OrdersDetailsService) {}
}
