import {Module, forwardRef} from "@nestjs/common";
import {FriendController} from "./friend.controller";
import {FriendService} from "./friend.service";
import {PrismaModule} from "../prisma/prisma.module";
import {AdminController} from "./admin/admin.controller";
import { UserService } from "../user/user.service";
import { UserModule } from "../user/user.module";
import { MatchModule } from "../match/match.module";

@Module({
    controllers: [FriendController, AdminController],
    providers: [FriendService, UserService],
    imports: [PrismaModule, forwardRef(() => UserModule), MatchModule],
    exports: [FriendService],
})
export class FriendModule {}
