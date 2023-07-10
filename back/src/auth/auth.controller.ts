import {Controller, Get, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {FortyTwoAuthGuard} from "../guards";

@Controller('auth')
export class AuthController {
    @Get('login')
    @UseGuards(FortyTwoAuthGuard)
    login() {console.log('login')}

    @Get('redirect')
    @UseGuards(FortyTwoAuthGuard)
    redirect(@Res() res: Response) {
        res.sendStatus(200);
    }
    @Get('status')
    status() {}


    @Get('logout')
    logout() {}
}
