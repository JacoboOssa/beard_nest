import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartsModule } from 'src/carts/carts.module';
import { Customer } from './entities/customer.entity';
import { Admin } from './entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Customer,Admin]),CartsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
