import {Module} from "@nestjs/common";
import {BlockController} from "./block.controller";
import {BlockService} from "./block.service";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    controllers: [BlockController],
    providers: [BlockService],
    imports: [PrismaModule],

})
export class BlockModule {}