import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Auth } from '../users/decorators/auth.decorator';
import { ValidRoles } from '../users/interfaces/valid-roles';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  // istanbul ignore next
  @Auth(ValidRoles.admin)
  @Post()
  seed(){
    return this.seedService.seed();
  }
}
