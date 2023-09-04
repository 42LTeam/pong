import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsernameAlreadyExistsPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const user = await this.prisma.user.findUnique({
      where: { username: value },
    });
    if (user) {
      throw new BadRequestException("Username already exists");
    }
    return value;
  }
}
