import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configurations from 'src/core/config/configurations';
import { Payload } from '../dtos';
import { ReqUser } from '../types';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { PermissionsStrategy } from './permissions.strategy';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  permissionsStrategy: PermissionsStrategy;
  constructor(@Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>, private prisma: PrismaService, permissionsStrategy: PermissionsStrategy) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });

    configService = this.configService;
    this.permissionsStrategy = permissionsStrategy;
  }

  async validate(payload: Payload): Promise<ReqUser> {
    const user = await this.prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw new UnauthorizedException();
    }

    const permissions = await this.permissionsStrategy.getPermissions(user.id);

    console.log('permissions', permissions)

    return { id: payload.id, role: user.idRole, permissions: permissions };
  }
}
