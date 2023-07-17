import {
  OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {ClientService} from "./client.service";
import {Injectable, UseGuards} from "@nestjs/common";
import {WSAuthenticatedGuard} from "../auth/guards/wsauthenticated.guard";

@WebSocketGateway(8001, {cors: '*'})
@Injectable()
export class ClientGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private clientService: ClientService) {}

  @WebSocketServer()
  server;

  async handleDisconnect(client: any) {
    await this.clientService.unsubscribe(client.id)
    console.log('disconnect ' + client.id);
  }

  async handleConnection(client: any, ...args): Promise<any> {
    const socketId = client.id;
    const user = await this.clientService.getClientById(socketId);
    if (!user) {
      client.emit('message', 'Unregistered.');
      return ;
    }
  }

  @SubscribeMessage('register')
  @UseGuards(WSAuthenticatedGuard)
  async handleRegister(): Promise<void> {
    console.log('oui dans la fonction')
  }
}

// async createMessage(user: number, channel: number, text: string)
