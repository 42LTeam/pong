import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FortyTwoStrategy } from "./strategies/fortytwo.strategy";
import { UserModule } from "../user/user.module";
import { SessionSerializer } from "./Serializer";
import { ClientModule } from "../client/client.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService, FortyTwoStrategy, SessionSerializer],
  imports: [UserModule, ClientModule],
})
export class AuthModule {}
