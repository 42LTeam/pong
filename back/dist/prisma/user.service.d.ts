import { PrismaService } from './prisma.service';
import { User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(id: number, username: string, secretO2FA: string, avatar: string, xp: number): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
}
