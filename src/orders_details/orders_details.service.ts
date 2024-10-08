import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDetails } from './entities/order_detail.entity';
import { CreateOrderDetailsDTO } from './dtos/create-order-details.dto';
import { OrdersService } from '../orders/orders.service';
import { ProductsService } from '../products/products.service';
import { PaginationDto } from '../common/dto/pagination.dto';
import { UpdateOrderDetailsDTO } from './dtos/update-order-details.dto';

@Injectable()
export class OrdersDetailsService {
    constructor(@InjectRepository (OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
    private readonly ordersService: OrdersService,
    private readonly productsService: ProductsService){}

    async create(createOrderDetailsDTO: CreateOrderDetailsDTO){
        try{
            const order = await this.ordersService.findOne(createOrderDetailsDTO.orderId);
            const product = await this.productsService.findOne(createOrderDetailsDTO.productId);
            const orderDetails = this.orderDetailsRepository.create({
                ...createOrderDetailsDTO,
                order: order,
                product: product});
            await this.orderDetailsRepository.save(orderDetails);
            return orderDetails;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async findAll(paginationDTO: PaginationDto){
        const {limit=10, offset=0} = paginationDTO
        return await this.orderDetailsRepository.find({
            skip: offset,
            take: limit
        });
    }

    async findOne(id: string){
        return await this.orderDetailsRepository.findOneBy({id});
    }

    async update(id: string, updateOrderDetailsDTO: UpdateOrderDetailsDTO){
        const orderDetails = await this.orderDetailsRepository.preload({
            id: id,
            ...updateOrderDetailsDTO
        });
        if(!orderDetails){
            throw new BadRequestException('Order Details not found');
        }
        try{
            await this.orderDetailsRepository.save(orderDetails);
            return orderDetails;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async remove(id: string){
        try{
            const orderDetails = await this.findOne(id);
            if(!orderDetails){
                throw new BadRequestException('Order Details not found');
            }
            await this.orderDetailsRepository.remove(orderDetails);
            return true;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }


    private  handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('Brand already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}
