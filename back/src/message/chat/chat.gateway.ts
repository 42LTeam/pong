import {MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {MessageService} from "../message.service";

@WebSocketGateway(8001, {cors: '*'})
export class ChatGateway {
  constructor(private messageService: MessageService) {}

  @WebSocketServer()
  server;
  @SubscribeMessage('message')
  async handleMessage(@MessageBody() message: string): Promise<void> {
    console.log(message);
    await this.messageService.createMessage(0,0 ,message);
    this.server.emit('message', message);
  }
}

// async createMessage(user: number, channel: number, text: string)
