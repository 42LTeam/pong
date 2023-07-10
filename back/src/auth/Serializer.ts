import { PassportSerializer } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {UserService} from "../prisma/user.service";
import {AuthService} from "./auth.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {

    constructor(private userSerivce: UserService) {
        super();
    }
    deserializeUser(user: any, done: Function): any {
        const userDB = this.userSerivce.getUserById(user.id);
        return userDB ? done(null, userDB) : done(null, null); 
    }

    serializeUser(user: any, done: Function): any {
        done(null, user);
    }

}