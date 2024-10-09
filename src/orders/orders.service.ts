import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UsersService } from '../users/users.service';
import { OrderStatus } from './interfaces/valid-status';
import { UpdateOrderDTO } from './dtos/update-order.dto';


@Injectable()
export class OrdersService {
    constructor(@InjectRepository (Order) private orderRepository: Repository<Order>,
    private readonly usersService: UsersService) {}

    // istanbul ignore next
    async findAll() {
        return await this.orderRepository.find();
    }

    // istanbul ignore next
    async findOne(id: string){
        const order = await this.orderRepository.findOneBy({id});
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    // istanbul ignore next
    async create(createOrderDTO: CreateOrderDTO) {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        const customer= await this.usersService.findOne(createOrderDTO.customer_id)
        const order = this.orderRepository.create({
            ...createOrderDTO,
            customer: customer,
            day: day,
            month: month,
            year: year,
            order_status: OrderStatus.PENDING
        });
        await this.orderRepository.save(order);
        return order;
    }

    // istanbul ignore next
    async update(id: string, updateOrderDTO: UpdateOrderDTO) {
        const order = await this.orderRepository.preload({
            id: id,
            ...updateOrderDTO,
        });
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        try {
            await this.orderRepository.save(order);
            return order;
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    async delete(id: string) {
        try {
            const order = await this.findOne(id);
            if (!order) {
                throw new NotFoundException('Order not found');
            }
            await this.orderRepository.remove(order);
        } catch (error) {
            this.handleDBExceptions(error);
        }
    }

    // istanbul ignore next
    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Blog already exists');
        }
        throw new InternalServerErrorException(error.code);
    }
}
