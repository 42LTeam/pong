import {Module} from "@nestjs/common";
import {FriendController} from "./friend.controller";
import {FriendService} from "./friend.service";
import {PrismaModule} from "../prisma/prisma.module";
import {AdminController} from "./admin/admin.controller";

@Module({
    controllers: [FriendController, AdminController],
    providers: [FriendService],
    imports: [PrismaModule],

})
export class FriendModule {}