import { Message } from "./message.entity";
import { Notification } from "./notification.entity";

export class User{
    userId: string;
    username: string;
    password: string;
    active: boolean;
    messages: Message[];
    notifications: Notification[];

}