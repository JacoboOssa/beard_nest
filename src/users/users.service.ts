import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { CartsService } from '../carts/carts.service';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';
import { LoginAdminDto } from './dtos/login-admin.dto';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(@InjectRepository (Customer) private customerRepository: Repository<Customer>,
    private readonly cartsService: CartsService, private readonly jwtService: JwtService){}

    async findAll(){
        return await this.customerRepository.find({where: {status: 'S'}});
    }

    async findOne(id: string){
        const user = await this.customerRepository.findOneBy({id});
        if (!user || user.status !== 'S'){
            throw new NotFoundException('User not found or inactive');
        }
        return user;
    }

    async findOneByEmail(email: string){
        const user = await this.customerRepository.findOneBy({email});
        if (!user || user.status !== 'S'){
            throw new NotFoundException('User not found or inactive');
        }
        return user;
    }

    async findOneByEmailAndReturnCart(email: string) {
        const user = await this.customerRepository
        .createQueryBuilder('customer')
        .leftJoinAndSelect('customer.cart', 'cart')
        .leftJoinAndSelect('cart.items', 'items') // Use 'items' here
        .leftJoinAndSelect('items.product', 'product')
        .where('customer.email = :email', { email })
        .andWhere('customer.status = :status', { status: 'S' })
        .getOne();

    if (!user) {
        throw new NotFoundException('User not found or inactive');
    }

    
        if (!user || user.status !== 'S') {
            throw new NotFoundException('User not found or inactive');
        }
    
        // Return only the cart ID along with user details if needed
        return {
            id: user.id,
            email: user.email,
            cart: {
                id: user.cart?.id,
                items: user.cart?.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    total: item.total,
                    product: {
                        id: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        main_url_image: item.product.main_url_image
                    },
                })) || [], // Return an empty array if no items
            },
        };
    }


    async createCustomer(createCustomerDTO: CreateCustomerDTO){
        try {
            const {password, ...rest} = createCustomerDTO;
            const userCart = await this.cartsService.create()
            const user = this.customerRepository.create({
                ...rest,
                password: bcrypt.hashSync(password, 10),
                cart: userCart,
                status: 'S',
                roles: ['user']});
            await this.customerRepository.save(user);
            return user;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async createAdmin(createAdminDTO: CreateAdminDTO){
        try{
            const {password, ...rest} = createAdminDTO;
            const user = this.customerRepository.create({
                ...rest,
                password: bcrypt.hashSync(password, 10),
                status: 'S',
                roles: ['admin']});
            await this.customerRepository.save(user);
            return user;
        }
        catch(error){
            this.handleDBExceptions(error);
        }
         
    }

    async loginUser(loginAdminDto: LoginAdminDto) {
        const {email, password} = loginAdminDto;
        const user = await this.customerRepository.findOne(
                {where:{email},
                select: {email: true, id: true, password:true}
            });

        if (!user){
            throw new UnauthorizedException('Invalid credentials (email)');
        }
        if (!bcrypt.compareSync(password, user.password)){
            throw new UnauthorizedException('Invalid credentials (password)');
        }


        return {...user, token: this.jwtService.sign({id: user.id})};
    }

    async logout(req: Request){
        console.log(req);
        // const token = req.headers.authorization?.split(' ')[1];
        // await this.customerRepository.invalidateToken(token);
        return {message: 'User logged out'};
    }

    async updateCustomer(id: string, updateCustomerDTO: UpdateCustomerDTO){
        const user = await this.customerRepository.preload({
            id: id,
            ...updateCustomerDTO,
        });
        if (!user){
            throw new NotFoundException('User not found');
        }
        try{
            await this.customerRepository.save(user);
            return user;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async updateAdmin(id: string, updateAdminDTO: UpdateAdminDTO){
        const user = await this.customerRepository.preload({
            id: id,
            ...updateAdminDTO,
        });
        if (!user){
            throw new NotFoundException('User not found');
        }
        try{
            await this.customerRepository.save(user);
            return user;
        }catch(error){
            this.handleDBExceptions(error);
        }
    }

    async delete(id: string){
        try{
            const user = await this.findOne(id);
            if (!user){
                throw new NotFoundException('User not found');
            }
            user.status = 'N';
            await this.customerRepository.save(user);
        }catch(error){
            this.handleDBExceptions(error);
        }
    }
    
    private handleDBExceptions(error: any) {
        if(error.code === '23505') {
          throw new BadRequestException('User already exists');
        }
        throw new InternalServerErrorException(error.code);
      }
}
