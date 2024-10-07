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
import { LoginAdminDto } from './dtos/login-admin.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  loginUser(@Body() loginAdminDto: LoginAdminDto) {
    return this.usersService.loginUser(loginAdminDto);
  }

  //Log out
  @Post('logout')
  @UseGuards(AuthGuard())
  logout(@Req() req) {
    return this.usersService.logout(req.user);
  }

  @Post('customers')
  async createCustomer(@Body() createCustomerDTO: CreateCustomerDTO) {
    return await this.usersService.createCustomer(createCustomerDTO);
  }

  @Auth(ValidRoles.admin)
  @Post('admins')
  async createAdmin(@Body() createAdminDTO: CreateAdminDTO) {
    return await this.usersService.createAdmin(createAdminDTO);
  }

  @Patch('customers/:id')
  async updateCustomer(@Param('id') id: string, @Body() updateCustomerDTO: UpdateCustomerDTO) {
    return await this.usersService.updateCustomer(id,updateCustomerDTO);
  }

  @Auth(ValidRoles.admin)
  @Patch('admins/:id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDTO: UpdateAdminDTO) {
    return await this.usersService.updateAdmin(id,updateAdminDTO);
  }

  @Auth(ValidRoles.admin)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Auth(ValidRoles.admin, ValidRoles.user)
  @Get('user/:id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Auth(ValidRoles.admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }

}
