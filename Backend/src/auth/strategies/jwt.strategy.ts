import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import configurations from 'src/core/config/configurations';
import { Payload } from '../dtos';
import { ReqUser } from '../types';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });

    configService = this.configService;
  }

  async validate(payload: Payload): Promise<ReqUser> {
    const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    const role = await this.prisma.roles.findUnique({ where: { id: user.idRole } });
    const form = await this.prisma.form.findMany();
    const permissions = (await this.prisma.permissions.findMany({ where: { idRole: user.idRole } })).map((permission) => {
      const route = form.find((form) => form.idForm === permission.idFormPermission);
      return {
        route: route?.route,
        role: role?.roleName,
        create: permission.create,
        read: permission.read,
        update: permission.update,
        delete: permission.delete,
      };
    });

    return { id: payload.id, role: user.idRole, permissions: permissions };
  }
}
