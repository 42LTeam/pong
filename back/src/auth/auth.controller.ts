import {Controller, Get, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {FortyTwoAuthGuard} from "./guards/fortytwo.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";

@Controller('auth')
export class AuthController {
    @Get('login')
    @UseGuards(FortyTwoAuthGuard)
    login() {console.log('login')}

    @Get('redirect')
    @UseGuards(FortyTwoAuthGuard)
    redirect(@Res() res: Response) {
        res.redirect('http://localhost:5173');

    }
    @Get('status')
    @UseGuards(AuthenticatedGuard)
    status() {
        return 'ok';
    }


    @Get('logout')
    logout() {}
}
