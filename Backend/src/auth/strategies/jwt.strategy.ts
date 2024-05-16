import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configurations from 'src/core/config/configurations';
import { Payload } from '../dtos';
import { ReqUser } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });

    configService = this.configService;
  }

  async validate(payload: Payload): Promise<ReqUser> {
    // const user = await this.usersRepository.findOneById(payload.id);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    return { id: payload.id, role: 'role' };
  }
}
