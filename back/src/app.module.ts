import { Module} from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {PassportModule} from "@nestjs/passport";
import { UserModule } from './user/user.module';
import {MessageModule} from "./message/message.module";
import {FriendModule} from "./friend/friend.module";
import { BlockModule } from './auth/block/block.module';
import { ChannelModule } from './channel/channel.module';
import {ClientModule} from "./client/client.module";
import { MatchModule } from './match/match.module';

@Module({

  imports: [
      PassportModule.register({session: true}),
      ConfigModule.forRoot(),
      CacheModule.register({
      isGlobal: true,
      }),

      AuthModule,
      UserModule,
      MessageModule,
      FriendModule,
      BlockModule,
      ChannelModule,
      ClientModule,
      MatchModule
  ],
})
export class AppModule{


}

