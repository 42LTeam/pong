import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {Status, User} from "@prisma/client";

@Injectable()
export class ClientService {

    constructor(private prisma: PrismaService) {}


    async getClientById(session: string): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { session },
        });
    }
    async unsubscribe(session: string){
        return this.prisma.user.updateMany({
            where: {session},
            data: {
                status: Status.OFFLINE,
                session: null
            },
        });
    }
    async subscribe(user: User, session: string) {
        const ret = user.session;
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                session,
                status: Status.ONLINE,
            },
        });
        return ret;
    }
}