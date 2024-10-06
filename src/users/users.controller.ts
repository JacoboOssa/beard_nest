import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateCustomerDTO } from './dtos/create-customer.dto';
import { CreateAdminDTO } from './dtos/create-admin.dto';
import { UpdateCustomerDTO } from './dtos/update-customer.dto';
import { UpdateAdminDTO } from './dtos/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user/get-user.decorator';
import { ValidRoles } from './interfaces/valid-roles';
import { Auth } from './decorators/auth.decorator';


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

  // @Get('routeProtectesTest')
  @Get('routeprotected4')
  @Auth(ValidRoles.admin, ValidRoles.write)
  routeProtected4(@Req() req) {
      console.log(req.user);
      return 'This route is protected';
  }


  @Get('routeprotected3')
  @UseGuards(AuthGuard())
  routeProtected3(@GetUser() user) {
      console.log(user);
      return 'This route is protected';
 }
}
