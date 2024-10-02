import { Module } from '@nestjs/common';
import { CartItemsService } from './cart_items.service';
import { CartItemsController } from './cart_items.controller';
import { CartItem } from './entities/cart_item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CartsModule } from 'src/carts/carts.module';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), ProductsModule, CartsModule],
  controllers: [CartItemsController],
  providers: [CartItemsService],
})
export class CartItemsModule {}
