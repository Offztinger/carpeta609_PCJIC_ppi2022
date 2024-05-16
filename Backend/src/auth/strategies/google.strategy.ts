import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { OAuth2Strategy, VerifyFunction, Profile } from 'passport-google-oauth';

import configurations from 'src/core/config/configurations';

@Injectable()
export class GoogleStrategy extends PassportStrategy(OAuth2Strategy) {
  constructor(@Inject(configurations.KEY) private readonly configService: ConfigType<typeof configurations>) {
    super({
      clientID: configService.googleClientId,
      clientSecret: configService.googleClientSecret,
      callbackURL: `${configService.backendUrl}/auth/google/redirect`,
      scope: ['email', 'profile'],
    });

    configService = this.configService;
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyFunction) {
    const { name, emails, photos } = profile;

    const user = {
      email: emails ? emails[0].value : null,
      firstName: name ? name.givenName : null,
      lastName: name ? name.familyName : null,
      picture: photos ? photos[0].value : null,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
