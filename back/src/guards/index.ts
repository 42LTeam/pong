import { CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard('42') implements CanActivate{
    async canActivate(context: ExecutionContext) : Promise<any> {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        console.log(request);
        await super.logIn(request);
        return activate;
    }
}


@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>{
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }

}