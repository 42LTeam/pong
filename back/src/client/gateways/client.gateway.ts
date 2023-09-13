import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ClientService } from "../client.service";
import {ForbiddenException, Injectable, UseGuards} from "@nestjs/common";
import { WSAuthenticatedGuard } from "../../auth/guards/wsauthenticated.guard";
import {User, UserChannel} from "@prisma/client";
import { ChannelService } from "../../channel/channel.service";
import { MessageService } from "../../message/message.service";

@WebSocketGateway(8001, { cors: "*" })
@Injectable()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private clientService: ClientService,
    private channelService: ChannelService,
    private messageService: MessageService
  ) {}

  @WebSocketServer()
  server;

  async handleDisconnect(client: any) {
    await this.clientService.unsubscribe(client.id);
    console.log("deconnection " + client.id);
  }

  async handleConnection(client: any, ...args): Promise<any> {
    const socketId = client.id;
    const user = await this.clientService.getClientById(socketId);
    console.log("connection " + client.id);
    if (!user) {
      client.emit("message", "Unregistered.");
      return;
    }
  }

  @SubscribeMessage("register")
  @UseGuards(WSAuthenticatedGuard)
  async handleRegister(client, data): Promise<void> {
    if (data.target) this.server.sockets.sockets.get(data.target)?.disconnect();
  }

  @SubscribeMessage("channel-invite")
  @UseGuards(WSAuthenticatedGuard)
  async newChannelInvite(client, data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    await this.channelService.sendInvite(data);
    const users: User[] = await this.channelService.getAllUsersInChannel(
      data.channelId
    );
    for (const u of users) {
      this.server.sockets.sockets.get(u.session)?.emit("new-channel", {
        creator: { id: user.id, username: user.username, avatar: user.avatar },
        users,
        channelId: data.channelId,
      });
    }
  }

  @SubscribeMessage("new-message")
  @UseGuards(WSAuthenticatedGuard)
  async newMessage(client, data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);

    const usersInChannel = await this.channelService.getAllUserChannelsInChannel(data.channelId);
    if (!usersInChannel.some(u => !u.isBanned && u.userId === user.id)) {
      throw new ForbiddenException("User isn't in this channel.");
    }
    const Until = new Date();

    if (usersInChannel.some(u => u.isMuted !== null || u.isMuted < Until)) {
      throw new ForbiddenException("User have been mute for a while in this channel.");
    }
    const message = await this.messageService.createMessage(
      user.id,
      data.channelId,
      data.content
    );

    for (const u of usersInChannel.filter((u) => !u.isBanned)) {
      this.server.sockets.sockets.get(u.user.session)?.emit("new-message", message);
    }
  }
}

// async createMessage(user: number, channel: number, text: string)
