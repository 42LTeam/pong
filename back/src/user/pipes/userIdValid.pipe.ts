import { Injectable, PipeTransform, NotFoundException } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class UserIdValidationPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(value: number) {
    const user = await this.userService.getUserById(value);
    if (!user) {
      throw new NotFoundException(`User with id ${value} not found`);
    }
    return value;
  }
}
