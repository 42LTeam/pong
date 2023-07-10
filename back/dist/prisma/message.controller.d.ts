import { Message } from '@prisma/client';
import { MessageService } from './message.service';
declare class CreateMessageDto {
    id: number;
    user: number;
    channel: number;
    text: string;
}
export declare class MessageController {
    private messageService;
    constructor(messageService: MessageService);
    createMessage(createMessageDto: CreateMessageDto): Promise<Message>;
    getAllMessage(): Promise<Message[]>;
    getMessageById(id: string): Promise<Message | null>;
    getMessageByUser(user: number): Promise<Message[] | null>;
    getMessageByChannel(id: number): Promise<Message[] | null>;
}
export {};
