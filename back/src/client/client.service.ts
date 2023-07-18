import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class ClientService {

    constructor(private prisma: PrismaService) {}


    async getClientById(secretO2FA: string): Promise<User | null> {
        //TODO create real slot for this
        return this.prisma.user.findFirst({
            where: { secretO2FA },
        });
    }
    async unsubscribe(secretO2FA: string){
        return this.prisma.user.updateMany({
            where: {secretO2FA},
            data: {
                secretO2FA: null
            },
        });
    }
    async subscribe(user: User, secretO2FA: string) {
        const ret = user.secretO2FA;
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                secretO2FA
            },
        });
        return ret;
    }
}