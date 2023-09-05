import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "./user/user.module";
import { MessageModule } from "./message/message.module";
import { FriendModule } from "./friend/friend.module";
import { BlockModule } from "./block/block.module";
import { ChannelModule } from "./channel/channel.module";
import { ClientModule } from "./client/client.module";
import { MatchModule } from "./match/match.module";
import { MulterModule } from "@nestjs/platform-express";
import { FileUploadService } from "./file-upload/file-upload.service";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),

    AuthModule,
    UserModule,
    MessageModule,
    FriendModule,
    BlockModule,
    ChannelModule,
    ClientModule,
    MatchModule,
  ],

  providers: [FileUploadService],
})
export class AppModule {}
