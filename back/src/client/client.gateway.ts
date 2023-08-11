import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {ClientService} from "./client.service";
import {Injectable, UseGuards} from "@nestjs/common";
import {WSAuthenticatedGuard} from "../auth/guards/wsauthenticated.guard";
import {User} from "@prisma/client";
import {ChannelService} from "../channel/channel.service";
import {MessageService} from "../message/message.service";

@WebSocketGateway(8001, {cors: '*'})
@Injectable()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private clientService: ClientService,
              private channelService: ChannelService,
              private messageService: MessageService) {}

  @WebSocketServer()
  server;

  async handleDisconnect(client: any) {
    await this.clientService.unsubscribe(client.id)
    console.log("deconnection " + client.id)
  }

  async handleConnection(client: any, ...args): Promise<any> {
    const socketId = client.id;
    const user = await this.clientService.getClientById(socketId);
    console.log("connection " + client.id)
    if (!user) {
      client.emit('message', 'Unregistered.');
      return ;
    }
  }
  @SubscribeMessage('register')
  @UseGuards(WSAuthenticatedGuard)
  async handleRegister(client,data): Promise<void> {
    if(data.target) this.server.sockets.sockets.get(data.target)?.disconnect()
  }



  @SubscribeMessage('new-message')
  @UseGuards(WSAuthenticatedGuard)
  async newMessage(client,data): Promise<void> {
    const user = await this.clientService.getClientById(client.id);
    const message = await this.messageService.createMessage(user.id, data.channelId, data.content);
    const users: User[] = await this.channelService.getUserInChannel(data.channelId);
    console.log(users.length);
    for (const u of users) {
      this.server.sockets.sockets.get(u.session)?.emit('new-message', {id:data.channelId, message: JSON.stringify(message)});
    }
  }
}

// async createMessage(user: number, channel: number, text: string)
