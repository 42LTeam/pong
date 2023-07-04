import { ChatsService } from './chats.service';
import { Server, Socket } from 'socket.io';
import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    constructor(private chatsService: ChatsService) {}

    async handleConnection(socket: Socket) {
        await this.chatsService.getUserFromSocket(socket)
    }

    @SubscribeMessage('send_message')
    async listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {

        const user = await this.chatsService.getUserFromSocket(socket)
        this.server.sockets.emit('receive_message', {
            message,
            user
        });
    }
}