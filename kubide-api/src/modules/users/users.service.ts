import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
        userId: 1,
        username: 'vcr@gmail.com',
        password: 'noPass',
        active: true
    },
    {
        userId: 2,
        username: 'mav@gmail.com',
        password: 'noPass',
        active: true
    },
  ];

    getUsers(): User[]{
        return this.users;
    }

    getUser(username: string, password: string): User{
        return this.users.find((item) => item.username === username && item.password === password);
    }

    getUserEmail(username: string): User{
        return this.users.find((item) => item.username === username);
    }

    createUser(username: string, password: string) :boolean{
        const user: User = this.getUserEmail(username) ;
        if(user!== undefined){
            this.users.push({
                userId: (Math.floor(Math.random() * 10000)), //TODO, buscar ultimo id y sumarle 1
                username,
                password,
                active: true,
            })
            return true;

        }
        return false;
    }

    updateUser(username: string, password: string){
        const user: User = this.getUser(username, password);
        user.username = username;
        user.password = password;
        return user;
    }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}