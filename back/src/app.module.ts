import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './prisma/user.service';
import { UserController } from './prisma/user.controller';
import { ChatGateway } from './chat/chat.gateway';
import { FriendService } from './prisma/friend.service';
import { FriendController } from './prisma/friend.controller';
import { MessageController } from './prisma/message.controller';
import { MessageService } from './prisma/message.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController, FriendController, MessageController],
  providers: [AppService, PrismaService, UserService, FriendService, MessageService, ChatGateway],
})
export class AppModule {}

