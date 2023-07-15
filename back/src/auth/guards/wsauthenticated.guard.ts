import { CanActivate, ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class WSAuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean{
        const req = context.switchToWs();
        console.log(req);
        return true;
    }

}