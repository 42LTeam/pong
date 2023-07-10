import { Message } from '@prisma/client';
import { MessageService } from './message.service';
declare class CreateMessageDto {
    user: number;
    channel: number;
    text: string;
}
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    getAllMessage(): Promise<Message[]>;
    getMessageById(id: number): Promise<Message | null>;
    getMessageByUser(user: number): Promise<Message[] | null>;
    getMessageByChannel(channel: number): Promise<Message[] | null>;
}
export {};
