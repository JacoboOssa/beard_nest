import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';
import { OrdersDetailsController } from './orders_details.controller';

@Module({
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
