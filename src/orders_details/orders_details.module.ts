import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';
import { OrdersDetailsController } from './orders_details.controller';
import { OrderDetails } from './entities/order_detail';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetails])],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
