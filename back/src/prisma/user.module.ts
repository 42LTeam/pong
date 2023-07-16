import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaService} from "./prisma.service";
import {FriendService} from "./friend.service";
import {MessageService} from "./message.service";
import {FriendController} from "./friend.controller";
import {MessageController} from "./message.controller";
import {ChatGateway} from "../chat/chat.gateway";
import {CacheModule} from "@nestjs/cache-manager";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        CacheModule.register({
            isGlobal: true,
        }),
    ],

    controllers: [UserController, FriendController, MessageController],
    providers: [UserService, PrismaService,FriendService, MessageService, ChatGateway],
    exports: [UserService],

})
export class UserModule {}
