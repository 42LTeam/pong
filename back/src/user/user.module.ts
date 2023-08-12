import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaModule} from "../prisma/prisma.module";
import {StringPipe} from "./pipes/string.pipe";
import { FriendService } from 'src/friend/friend.service';

@Module({


    controllers: [UserController],
    providers: [UserService, StringPipe, FriendService],
    imports: [PrismaModule],
    exports: [UserService],

})
export class UserModule {}
