import { CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>{
        const req = context.switchToHttp().getRequest();
        return req.isAuthenticated();
    }

}