import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';
import { UpdateAdminDTO } from './dtos/update-admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('customers')
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return await this.usersService.createCustomer(createCustomerDTO);
  }

  @Post('admins')
  async createAdmin(@Body() createAdminDTO: CreateAdminDTO) {
    return await this.usersService.createAdmin(createAdminDTO);
  }

  @Patch('customers/:id')
  async updateCustomer(@Param('id') id: string, @Body() updateCustomerDTO: UpdateCustomerDTO) {
    return await this.usersService.updateCustomer(id,updateCustomerDTO);
  }

  @Patch('admins/:id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDTO: UpdateAdminDTO) {
    return await this.usersService.updateAdmin(id,updateAdminDTO);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

}
