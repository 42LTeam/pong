import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { StringPipe } from "./pipes/string.pipe";
import { FriendModule } from "../friend/friend.module";
import { MatchModule } from "../match/match.module";

@Module({
  controllers: [UserController],
  providers: [UserService, StringPipe],
  imports: [PrismaModule, forwardRef(() => FriendModule), MatchModule],
  exports: [UserService],
})
export class UserModule {}
