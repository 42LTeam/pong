import { Module, forwardRef } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "../prisma/prisma.module";
import { StringPipe } from "./pipes/string.pipe";
import { FriendModule } from "../friend/friend.module";
import { MatchModule } from "../match/match.module";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadService } from "../file-upload/file-upload.service";
import { UsernameValidationPipe } from "./pipes/usernameValidation.pipe";

@Module({
  controllers: [UserController],
  providers: [UserService, StringPipe, UsernameValidationPipe, FileUploadService],
  imports: [
    PrismaModule,
    forwardRef(() => FriendModule),
    MatchModule,
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),
  ],
  exports: [UserService],
})
export class UserModule {}
