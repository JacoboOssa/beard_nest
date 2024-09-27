import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { BlogsModule } from './blogs/blogs.module';
import { CategoriesModule } from './categories/categories.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CartItemsModule } from './cart_items/cart_items.module';
import { CartsModule } from './carts/carts.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersDetailsModule } from './orders_details/orders_details.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [ProductsModule, BlogsModule, CategoriesModule, OrdersModule, ImagesModule, OrdersDetailsModule, CommentsModule, CartsModule, CartItemsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
