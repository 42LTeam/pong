import { UserService } from "../prisma/user.service";
export declare class AuthService {
    private usersService;
    constructor(usersService: UserService);
    validateUser(profile: any): Promise<any>;
}
