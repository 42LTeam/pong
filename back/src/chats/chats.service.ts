import { Injectable } from '@nestjs/common';
import { Socket }  from "socket.io";
import { WsException } from "@nestjs/websockets";
import { UserService } from '../prisma/user.service';

@Injectable()
export class ChatsService {
    constructor(private userService: UserService) {}
    // constructor(private authService: AuthService, @InjectModel(Message.name) private messageModel: Model<MessageDocument>) {}

    async getUserFromSocket(socket: Socket) {
//todo : need auth, not id, at the end
        const user = this.userService.getUserById(0);

        if (!user) {
            throw new WsException('Invalid credentials.');
        }

        return user;
    }

    async createMessage(message: MessageDto)
}



/* FOR AUTH
     constructor(private authService: AuthService) {}

    async getUserFromSocket(socket: Socket) {
        let auth_token = socket.handshake.headers.authorization;
        // get the token itself without "Bearer"
        auth_token = auth_token.split(' ')[1];

        const user = this.authService.getUserFromAuthenticationToken(
            auth_token
        );

        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        return user;
    }
    LINK TO auth.service function:

    public async getUserFromAuthenticationToken(token: string) {
        const payload: JwtPayload = this.jwtService.verify(token, {
          secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        });

        const userId = payload.sub

        if (userId) {
            return this.usersService.findById(userId);
        }
      }

     */