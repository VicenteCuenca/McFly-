import { Controller, Request, Post, UseGuards, Get, Body, Param } from '@nestjs/common';

import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { Message } from './modules/users/message.entity';

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

  @Get('getUser/:id')
  async getUserId(@Param('id') id: string) {
    return  this.authService.getUserId(id);
  }

  @Get('getActiveUsers')
  async getActiveUsers() {
    return  this.authService.getActiveUsers();
  }

  @Get('getMessages/:userId')
  async getMessagesUser(@Param('userId') id: string) {
    return  this.authService.getMessagesUser(id);
  }

  @Get('addMessages/:userId')
  async addMessagesUser(@Param('userId') id: string, @Body() message: Message ) {
    return  this.authService.addMessage(id, message);
  }


}
