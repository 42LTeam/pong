import { Injectable } from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UserService) {}

    async validateUser(profile: any): Promise<any> {
        const user = await this.usersService.getUserById(parseInt(profile.id));
        if (!user)
            return this.usersService.createUser(parseInt(profile.id), profile.username, 'jsp', 'jsp', 0);
        return user;
    }
}
