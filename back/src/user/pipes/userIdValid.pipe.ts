import { Injectable, PipeTransform, NotFoundException, BadRequestException } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: number) {
    if (value.toString().length > 9) {
      throw new BadRequestException("Id is too large")
    }
    const user = await this.userService.getUserById(value);
    if (!user) {
      throw new NotFoundException(`User with id ${value} not found`);
    }
    return value;
  }
}
