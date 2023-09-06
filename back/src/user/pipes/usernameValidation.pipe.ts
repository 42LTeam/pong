import { Injectable, PipeTransform, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class UsernameValidationPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  async transform(value: any) {
    if (typeof value !== 'string' || value.length > 16) {
      throw new BadRequestException("Maximum 16 characters");
    }

    const user = await this.prisma.user.findUnique({
      where: { username: value },
    });
    if (user) {
      throw new BadRequestException("Username already exists");
    }

    return value;
  }
}

