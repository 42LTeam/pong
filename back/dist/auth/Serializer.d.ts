import { PassportSerializer } from "@nestjs/passport";
import { UserService } from "../prisma/user.service";
export declare class SessionSerializer extends PassportSerializer {
    private userSerivce;
    constructor(userSerivce: UserService);
    deserializeUser(user: any, done: Function): any;
    serializeUser(user: any, done: Function): any;
}
