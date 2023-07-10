import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {FortyTwoStrategy} from "../strategy";
import {UserService} from "../prisma/user.service";
import {AppModule} from "../app.module";
import {UserModule} from "../prisma/user.module";
import {SessionSerializer} from "./Serializer";

@Module({
  controllers: [AuthController],
  providers: [AuthService,FortyTwoStrategy, SessionSerializer],
  imports: [UserModule]
})
export class AuthModule {}
