import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
        userId: '1',
        username: 'vcr@gmail.com',
        password: 'noPass',
        active: true,
        messages :[
            {
                messageId:"1",
                message:"hola",
                idUserTo: "2"
            }
        ],
        notifications : [
            {
                notificationId:"1",
                messageId:"1",
                look: false
            }
        ]
        
    },
    {
        userId: '2',
        username: 'mav@gmail.com',
        password: 'noPass',
        active: true,
        messages :[
            {
                messageId:"2",
                message:"hola Vince",
                idUserTo:"1"
            }
        ],
        notifications : [
            {
                notificationId:"2",
                messageId:"2",
                look: false
            }
        ]
        
    },
    {
        userId: '3',
        username: 'eac@gmail.com',
        password: 'noPass',
        active: true,
        messages :[
            {
                messageId:"3",
                message:"hola a todos",
                idUserTo: "1"
            },
            {
                messageId:"4",
                message:"hola a todos",
                idUserTo: "2"
            }
        ],
        notifications : [
            {
                notificationId:"3",
                messageId:"3",
                look: false
            },
            {
                notificationId:"4",
                messageId:"4",
                look: false
            },
        ]
        
    }
    
  ];

    getUsers(): User[]{
        return this.users;
    }

    getUser(username: string, password: string): User{
        return this.users.find((item) => item.username === username && item.password === password);
    }

    getUserId(id: string): User{
        const miUser = this.users.find((item) => item.userId === id);
        return miUser;
    }

    getActiveUsers(): User[]{
        const miUser = this.users.filter((item) => item.active === true);
        return miUser;
    }

    getUserEmail(username: string): User{
        return this.users.find((item) => item.username === username);
    }

    createUser(username: string, password: string) :boolean{
        const user: User = this.getUserEmail(username) ;
        if(user!== undefined){
            this.users.push({
                userId: (Math.floor(Math.random() * 10000)).toString(), //TODO, buscar ultimo id y sumarle 1
                username,
                password,
                active: true,
                messages: [],
                notifications: [],
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

    
    getMessagesUser(userId: string): Message[]{
        return this.users.find((item) => item.userId === userId).messages;
    }

    addMessage(userId: string, message: Message) {
        const user: User = this.getUserId(userId) ;
        if(user!== undefined){
            let miMessages = this.getMessagesUser(userId);
            miMessages.push(message)
            this.users[userId].messages = miMessages ;
            // return this.getMessagesUser(userId);//Compuebo si se ha añadido
            return this.users[userId].messages;//Compuebo si se ha añadido

        }
    }


  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}