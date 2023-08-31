import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {FortyTwoStrategy} from "./strategies/fortytwo.strategy";
import {UserModule} from "../user/user.module";
import {SessionSerializer} from "./Serializer";
import {ClientModule} from "../client/client.module";
import {BlockModule} from "../block/block.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService,FortyTwoStrategy, SessionSerializer],
  imports: [UserModule, ClientModule, BlockModule]
})
export class AuthModule {}
