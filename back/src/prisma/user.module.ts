import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaService} from "./prisma.service";
import {FriendService} from "./friend.service";
import {MessageService} from "./message.service";
import {FriendController} from "./friend.controller";
import {MessageController} from "./message.controller";

@Module({
    controllers: [UserController, FriendController, MessageController],
    providers: [UserService, PrismaService,FriendService, MessageService],
    exports: [UserService]
})
export class UserModule {}
