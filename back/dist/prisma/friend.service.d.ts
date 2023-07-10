import { PrismaService } from './prisma.service';
import { Friends } from '@prisma/client';
export declare class FriendService {
    private prisma;
    constructor(prisma: PrismaService);
    createFriend(id: number, user_1: number, user_2: number, status: string, created_at: Date): Promise<Friends>;
    getAllFriends(): Promise<Friends[]>;
    getFriendById(id: number): Promise<Friends | null>;
    updateFriendStatus(id: number, status: string): Promise<Friends>;
}
