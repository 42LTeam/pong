import { Strategy } from 'passport-42';
import { PassportStrategy} from "@nestjs/passport";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import * as process from "process";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService) {
        super({
            clientID: process.env.FORTYTWO_UID,
            clientSecret: process.env.FORTYTWO_SECRET,
            callbackURL: process.env.FORTYTWO_CALLBACK
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const user = await this.authService.validateUser(profile);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
