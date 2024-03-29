import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard("42") implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    const user = await request.user;
    request.session.totp = !Boolean(user.secretO2FA);
    return activate;
  }
}
