import {Module} from "@nestjs/common";
import {FriendController} from "./friend.controller";
import {FriendService} from "./friend.service";
import {PrismaModule} from "../prisma/prisma.module";
import {AdminController} from "./admin/admin.controller";
import { UserService } from "src/user/user.service";

@Module({
    controllers: [FriendController, AdminController],
    providers: [FriendService, UserService],
    imports: [PrismaModule],

})
export class FriendModule {}