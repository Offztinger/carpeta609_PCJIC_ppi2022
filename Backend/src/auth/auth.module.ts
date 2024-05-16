import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy, JwtStrategy, LocalStrategy } from './strategies';
import configurations, { configRoot } from 'src/core/config/configurations';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot(configRoot())],
      inject: [configurations.KEY],
      useFactory(configEnvs: ConfigType<typeof configurations>) {
        return { secret: configEnvs.jwtSecret, signOptions: { expiresIn: configEnvs.jwtExpiresIn } };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy, LocalStrategy],
})
export class AuthModule {}
