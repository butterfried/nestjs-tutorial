import { Controller, Request, Post, UseGuards, Get, UseInterceptors } from '@nestjs/common';import { AuthGuard } from '@nestjs/passport';
import { CheckRoleAdminInterceptor } from 'src/checkRole.interceptor';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const accessToken = this.authService.generateAccessToken(req.user);
    return {
      "accessToken": accessToken
    }
  }

  @UseInterceptors(CheckRoleAdminInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  logout() {
    // return this.authService.logout();
  }

}
