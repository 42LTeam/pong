import { PrismaService } from './prisma.service';
import { Friend } from '@prisma/client';
export declare class FriendService {
    private prisma;
    constructor(prisma: PrismaService);
    createFriend(id: number, user_1: string, user_2: string, status: string, created_at: string): Promise<Friend>;
    getAllFriends(): Promise<Friend[]>;
    getFriendById(id: number): Promise<Friend | null>;
}
