import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {Response} from "express";
import {FortyTwoAuthGuard} from "./guards/fortytwo.guard";
import {AuthenticatedGuard} from "./guards/authenticated.guard";
import {ClientService} from "../client/client.service";
import {BlockService} from "../block/block.service";
import {FriendService} from "../friend/friend.service";

@Controller('auth')
export class AuthController {


    constructor(private clientService:ClientService,
                private blockService:BlockService,
                private friendService:FriendService
                ) {
    }
    @Get('login')
    @UseGuards(FortyTwoAuthGuard)
    login() {console.log('login')}

    @Get('redirect')
    @UseGuards(FortyTwoAuthGuard)
    redirect(@Res() res: Response) {
        const localhostfront = process.env.LOCALHOST ? 'http://' + process.env.LOCALHOST + ':5173' : 'http://localhost:5173';
        res.redirect(localhostfront);

    }
    @Get('status')
    @UseGuards(AuthenticatedGuard)
    async status(@Req() request) {
        const ret = await request.user;
        const blocked = await this.blockService.getBlockedUsers(ret.id);
        ret.blockList = blocked.map(c => {
            return c.id;
        });
        ret.friendList = await this.friendService.getUserFriendships(ret.id);
        return await request.user;
    }

    @Get('socketId')
    @UseGuards(AuthenticatedGuard)
    async socketId(@Req() req){
        const user = await req.user;
        return this.clientService.subscribe(user, req.headers.clientsocketid);
    }

}
