import { Module } from '@nestjs/common';
import { OrdersDetailsService } from './orders_details.service';
import { OrdersDetailsController } from './orders_details.controller';
import { OrderDetails } from './entities/order_detail';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([OrderDetails]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {expiresIn: configService.get('JWT_EXPIRES_IN')}
      })
    }),
    PassportModule.register({defaultStrategy: 'jwt'}),
    OrdersModule,
    ProductsModule
  ],
  controllers: [OrdersDetailsController],
  providers: [OrdersDetailsService],
})
export class OrdersDetailsModule {}
