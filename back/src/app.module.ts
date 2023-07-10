import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

