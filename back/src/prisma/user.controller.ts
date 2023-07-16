import {Controller, Get, Param, Post, Body, UseGuards, Req} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import {IsNotEmpty, IsNumber} from "@nestjs/class-validator";
import {AuthenticatedGuard} from "../auth/guards/authenticated.guard"

class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  secretO2FA: string;

  @ApiProperty()
  @IsNotEmpty()
  avatar: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  xp: number;
}

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto.id, createUserDto.username, createUserDto.secretO2FA, createUserDto.avatar, createUserDto.xp);
  }

  @Get()
  async getAllUsers(@Req() req): Promise<User[]> {
    await req.user;
    console.log(req.user);
    return this.userService.getAllUsers();
  }

  @Get('id/:id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }
}
