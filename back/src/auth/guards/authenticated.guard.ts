import { CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private reflector: Reflector) {}


    async canActivate(context: ExecutionContext): Promise<any>{
        const req = context.switchToHttp().getRequest();
        const role = this.reflector.get<number>('roles', context.getHandler());
        if (!role) {
          return req.isAuthenticated();
        }
        const user = await req.user;

        return req.isAuthenticated() && user.role >= role;
    }

}