import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './prisma/user.service';
import { UserController } from './prisma/user.controller';
import { FriendService } from './prisma/friend.service';
import { FriendController } from './prisma/friend.controller';
import { MessageController } from './prisma/message.controller';
import { MessageService } from './prisma/message.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
  ],
  controllers: [AppController, UserController, FriendController, MessageController],
  providers: [AppService, PrismaService, UserService, FriendService, MessageService],
})
export class AppModule {}

