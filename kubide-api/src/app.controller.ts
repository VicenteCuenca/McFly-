
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';

import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('getUsers')
  async getUsers() {
    return this.authService.getUsers();
  }

}
