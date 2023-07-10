import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<any>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: any): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        username: string;
        secretO2FA: string;
        avatar: string;
        xp: number;
    }, unknown, never> & {}>;
}
