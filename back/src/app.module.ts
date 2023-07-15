import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import {PassportModule} from "@nestjs/passport";
import { UserModule } from './prisma/user.module';

@Module({
  imports: [
      PassportModule.register({session: true}),
      ConfigModule.forRoot(),
      CacheModule.register({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
  ]

})
export class AppModule {}

