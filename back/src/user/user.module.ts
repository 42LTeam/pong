import { Module } from '@nestjs/common';
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {PrismaModule} from "../prisma/prisma.module";
import {StringPipe} from "./pipes/string.pipe";

@Module({


    controllers: [UserController],
    providers: [UserService, StringPipe],
    imports: [PrismaModule],
    exports: [UserService],

})
export class UserModule {}
