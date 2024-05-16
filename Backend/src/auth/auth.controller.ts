import { Controller, Get, Post, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleUser } from './types';
import { GoogleAuthGuard, LocalAuthGuard } from './guards';
import { Payload } from './dtos';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Express.Request & { user: Payload }) {
    return await this.authService.login(req.user.id);
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleGoogleLogin() {
    return 'You are being redirected to google';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect()
  async handleGoogleRedirect(@Req() req: Express.Request & { user: GoogleUser }) {
    await this.authService.handleGoogleLogin(req.user.email);

    return { url: `${process.env.FRONT_URL}` };
  }
}
