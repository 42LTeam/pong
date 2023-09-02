import {Module} from "@nestjs/common";
import {BlockController} from "./block.controller";
import {BlockService} from "./block.service";
import {PrismaModule} from "../prisma/prisma.module";
import {FriendModule} from "../friend/friend.module";

@Module({
    controllers: [BlockController],
    providers: [BlockService],
    imports: [PrismaModule, FriendModule],
    exports: [BlockService]
})
export class BlockModule {}