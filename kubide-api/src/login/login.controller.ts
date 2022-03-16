import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
    @Get()
    getLogin(): string{
        return "Hello to login!";
    }

    @Get(':name')
    getLoginName(@Param('name') name : string) : string{
        return `Hello to login ${name}!`;
    }

    @Post()
    createLogin(@Body('name') name : string){
        return `Hi ${name}`;
    }
}
