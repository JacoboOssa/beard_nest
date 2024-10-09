import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { PassportModule } from '@nestjs/passport';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashed_password',
  };

  const mockUsersService = {
    loginUser: jest.fn().mockResolvedValue({ ...mockUser, token: 'token_123' }),
    logout: jest.fn().mockResolvedValue({ message: 'User logged out' }),
    createCustomer: jest.fn().mockResolvedValue(mockUser),
    createAdmin: jest.fn().mockResolvedValue(mockUser),
    updateCustomer: jest.fn().mockResolvedValue({ ...mockUser, name: 'Jane Doe' }),
    updateAdmin: jest.fn().mockResolvedValue({ ...mockUser, name: 'Admin Jane' }),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        JwtService,
      ],
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }) // Mock the PassportModule
      ]
    })
    .overrideGuard(AuthGuard('jwt'))
    .useValue({
      canActivate: jest.fn(() => true), // Mock the AuthGuard
    })
    .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', async () => {
    const loginDto = { email: 'john@example.com', password: 'password123' };
    expect(await controller.loginUser(loginDto)).toEqual({ ...mockUser, token: 'token_123' });
    expect(service.loginUser).toHaveBeenCalledWith(loginDto);
  });

  it('should logout a user', async () => {
    const req = { user: mockUser };
    expect(await controller.logout(req)).toEqual({ message: 'User logged out' });
    expect(service.logout).toHaveBeenCalledWith(req.user);
  });

  it('should create a customer', async () => {
    const customerDto = {
      name: 'John Doe', 
      email: 'john@example.com', 
      password: 'password123',
      billingAddress: '123 Main St',
      shippingAddress: '123 Main St',
      phone: '123-456-7890',
      country: 'USA',
      city: 'New York',
      lastname: 'Doe',
    };
    expect(await controller.createCustomer(customerDto)).toEqual(mockUser);
    expect(service.createCustomer).toHaveBeenCalledWith(customerDto);
  });

  it('should create an admin', async () => {
    const adminDto = { 
      name: 'Admin John', 
      email: 'admin@example.com', 
      password: 'adminpass123',
      lastname: 'Doe',
    };
    expect(await controller.createAdmin(adminDto)).toEqual(mockUser);
    expect(service.createAdmin).toHaveBeenCalledWith(adminDto);
  });

  it('should update a customer', async () => {
    const updateCustomerDto = { name: 'Jane Doe' };
    expect(await controller.updateCustomer('1', updateCustomerDto)).toEqual({ ...mockUser, name: 'Jane Doe' });
    expect(service.updateCustomer).toHaveBeenCalledWith('1', updateCustomerDto);
  });

  it('should update an admin', async () => {
    const updateAdminDto = { name: 'Admin Jane' };
    expect(await controller.updateAdmin('1', updateAdminDto)).toEqual({ ...mockUser, name: 'Admin Jane' });
    expect(service.updateAdmin).toHaveBeenCalledWith('1', updateAdminDto);
  });

  it('should return all users', async () => {
    expect(await controller.findAll()).toEqual([mockUser]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    expect(await controller.findOne('1')).toEqual(mockUser);
    expect(service.findOne).toHaveBeenCalledWith('1');
  });

  it('should delete a user', async () => {
    expect(await controller.delete('1')).toBeUndefined();
    expect(service.delete).toHaveBeenCalledWith('1');
  });
});
