import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { ClientService } from "../../client/client.service";

@Injectable()
export class WSAuthenticatedGuard implements CanActivate {
  constructor(private clientService: ClientService) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToWs();
    const user = await this.clientService.getClientById(req.getClient().id);
    return Boolean(user);
  }
}
