
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') ,
    });
  }

  async validate(payload: any) {
    const id: string = payload.id;
    const  user = await this.userRepository.findOneBy({id});
    if (!user) {
      throw new UnauthorizedException('Invalid Token');
    }

    // Check if the user is active. 
    if(user.status === 'I') {
        throw new UnauthorizedException('Inactive user');
    }

    return user;
  }
}
