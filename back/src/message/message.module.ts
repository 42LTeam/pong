import {Module} from "@nestjs/common";
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";
import {ChatGateway} from "./chat/chat.gateway";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    controllers: [MessageController],
    providers: [MessageService, ChatGateway],
    imports: [PrismaModule]
})
export class MessageModule {}