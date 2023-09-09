import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { FortyTwoAuthGuard } from "./guards/fortytwo.guard";
import { AuthenticatedGuard, TotpGuard } from "./guards/authenticated.guard";
import { ClientService } from "../client/client.service";
import { BlockService } from "../block/block.service";
import { FriendService } from "../friend/friend.service";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "@nestjs/class-validator";
import { UserService } from "../user/user.service";
import { authenticator } from "otplib";

class DoubleAuthDto {
  @IsNotEmpty()
  @IsString()
  token: string;
}

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(
    private clientService: ClientService,
    private blockService: BlockService,
    private friendService: FriendService,
    private userService: UserService,
  ) {}
  @Get("login")
  @UseGuards(FortyTwoAuthGuard)
  login() {
    console.log("login");
  }

  @Get("redirect")
  @UseGuards(FortyTwoAuthGuard)
  redirect(@Res() res: Response) {
    const localhostfront = process.env.LOCALHOST
      ? "http://" + process.env.LOCALHOST + ":5173"
      : "http://localhost:5173";
    res.redirect(localhostfront);
  }

  @Get("doubleAuth")
  @UseGuards(TotpGuard)
  async createDoubleAuth(@Req() request: any) {
    const user = await request.user;
    return this.userService.newSecret(user);
  }

  @Post("doubleAuth")
  @ApiBody({ type: DoubleAuthDto })
  @UseGuards(TotpGuard)
  async doubleAuth(@Req() request, @Body() body: DoubleAuthDto) {
    const user = await request.user;
    request.session.totp = authenticator.verify({
      token: body.token,
      secret: user.secretO2FA,
    });
    return request.session.totp;
  }

  @Get("status")
  @UseGuards(TotpGuard)
  async status(@Req() request) {
    const ret = await request.user;
    const blocked = await this.blockService.getBlockedUsers(ret.id);
    ret.blockList = blocked.map((c) => {
      return c.id;
    });
    ret.friendList = await this.friendService.getUserFriendships(ret.id);

    return {
      user: { ...ret, secretO2FA: Boolean(ret.secretO2FA) },
      destination: !request.session.totp ? "2fa" : "",
    };
  }

  @Get("socketId")
  @UseGuards(AuthenticatedGuard)
  async socketId(@Req() req) {
    const user = await req.user;
    return this.clientService.subscribe(user, req.headers.clientsocketid);
  }
}
