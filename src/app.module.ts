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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false, // You can set this to true if you have a proper SSL certificate.
      }
    }),
    ProductsModule, 
    BlogsModule, 
    CategoriesModule, 
    OrdersModule, 
    ImagesModule, 
    OrdersDetailsModule, 
    CommentsModule, 
    CartsModule, 
    CartItemsModule, 
    UsersModule, 
    CloudinaryModule, CommonModule, SeedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
