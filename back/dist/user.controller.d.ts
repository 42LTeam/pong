import { UserService } from './user.service';
import { User } from '@prisma/client';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(id: number, secretO2FA: string, avatar: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
}
