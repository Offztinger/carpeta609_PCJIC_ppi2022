import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy, VerifyFunction, Profile } from 'passport-google-oauth';

import configurations from 'src/core/config/configurations';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { PermissionsStrategy } from './permissions.strategy';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  permissionsStrategy: PermissionsStrategy;
  constructor(@Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>, private prisma: PrismaService, permissionsStrategy: PermissionsStrategy) {
    super({
      clientID: configService.googleClientId,
      clientSecret: configService.googleClientSecret,
      callbackURL: `${configService.backendUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });

    configService = this.configService;
    this.permissionsStrategy = permissionsStrategy;
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction) {
    const { name, emails, photos } = profile;

    let userInBD;

    if (emails) {
      userInBD = await this.prisma.user.findFirst({
        where: {
          email: emails[0].value,
        }
      });
    }

    const permissions = await this.permissionsStrategy.getPermissions(userInBD?.id);

    const user = {
      email: emails ? emails[0].value : null,
      firstName: name ? name.givenName : null,
      lastName: name ? name.familyName : null,
      picture: photos ? photos[0].value : null,
      permissions: permissions,
      accessToken,
      refreshToken,
    };

    console.log(user)
    done(null, user);
  }
}
