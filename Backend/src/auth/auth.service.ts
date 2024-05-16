import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dtos';
import { PrismaService } from 'src/core/database/prisma/prisma.service';
import { validatePassword } from 'src/utils/bycript.utils';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) { }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !validatePassword(password, user.password)) {
      return null;
    }

    return user;

  }

  async handleGoogleLogin(email: string) {
    return `handleGoogleLogin ${email}`;
  }

  async login(userId: string) {
    return `login ${userId}`;
  }

  async generateJwt(payload: Payload): Promise<string> {
    const { id } = payload;

    return this.jwtService.sign({ id });
  }
}
