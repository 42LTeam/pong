import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(
    @Body('id') id: number,
    @Body('secretO2FA') secretO2FA: string,
    @Body('avatar') avatar: string,
  ): Promise<User> {
    return this.userService.createUser(id, secretO2FA, avatar);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }
}
