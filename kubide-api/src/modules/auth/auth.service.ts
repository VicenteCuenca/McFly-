import { Injectable, MessageEvent } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Message } from '../users/message.entity';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if(this.getUserId(user.userId) !== undefined ){
      const payload = { username: user.username, sub: user.userId };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return "Error: User not found";
  }

  async getUsers(){
    return this.usersService.getUsers();
  }

   getUserId(id: string){
    return this.usersService.getUserId(id);
  }

   getActiveUsers(){
    return this.usersService.getActiveUsers();
   
  }

   getMessagesUser(id){
    return this.usersService.getMessagesUser(id);
  }

   addMessage(id, message: Message){
    return this.usersService.addMessage(id, message);
  }
}