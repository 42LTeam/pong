import { UserService } from './user.service';
import { User } from '@prisma/client';
declare class CreateUserDto {
    id: number;
    secretO2FA: string;
    avatar: string;
}
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
}
export {};
