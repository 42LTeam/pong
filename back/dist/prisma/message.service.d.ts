import { PrismaService } from './prisma.service';
import { Message } from '@prisma/client';
export declare class MessageService {
    private prisma;
    constructor(prisma: PrismaService);
    createMessage(user: number, channel: number, text: string): Promise<Message>;
    getAllMessages(): Promise<Message[]>;
    getMessageById(id: number): Promise<Message>;
    getMessageByUser(user: number): Promise<Message[]>;
    getMessageByChannel(channel_requested: number): Promise<Message[]>;
}
