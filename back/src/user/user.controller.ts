import {Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseIntPipe, Req} from '@nestjs/common';
import { ApiBody, ApiProperty, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "@nestjs/class-validator";
import {StringPipe} from "./pipes/string.pipe";
import { Roles } from 'src/auth/roles.decorator';
import {Status, User} from "@prisma/client";

class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @ApiProperty()
  secretO2FA: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  avatar: string;
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  xp: number;
}


enum Role {
  USER = 0,
  ADMIN = 1,
}

class UpdateUserAvatarDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  avatar: string;
}

class UpdateUserNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
}

export class UpdateUserStatusDto {
  @ApiProperty({ enum: Status })
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  @Roles(Role.ADMIN)  // For admin restrictions
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create a user' })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto.id, createUserDto.username, createUserDto.secretO2FA, createUserDto.avatar, createUserDto.xp);
  }

  @Get()
  @Roles(Role.USER) 
  @ApiOperation({ summary: 'Get all users' })
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Get user by id' })
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }

  @Put('avatar/:id')
  @ApiOperation({ summary: 'Update user\'s avatar' })
  @ApiBody({ type: UpdateUserAvatarDto })
  async updateUserAvatar(@Param('id', ParseIntPipe) id: number, @Body() updateUserAvatarDto: UpdateUserAvatarDto): Promise<User> {
    return this.userService.updateUserAvatar(Number(id), updateUserAvatarDto.avatar);
  }

  @Put('username/:id')
  @ApiOperation({ summary: 'Update user\'s username' })
  @ApiBody({ type: UpdateUserNameDto })
  async updateUserName(@Param('id', ParseIntPipe) id: number, @Body() updateUserNameDto: UpdateUserNameDto): Promise<User> {
    return this.userService.updateUserName(Number(id), updateUserNameDto.username);
  }

  @Get('friend/:id')
  @ApiOperation({ summary: 'Get friend of user' })
  async getFriendsOfUser(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.getFriendsOfUser(Number(id));
  }

  @Get('friend/online/:id')
  @ApiOperation({ summary: 'Get friend of user' })
  async getOnlineFriendsOfUser(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.getFriendsOfUser(Number(id), true);
  }

  @Get('search/:query')
  @ApiOperation({ summary: 'Search user by username' })
  async search(@Param('query', StringPipe) query: string, @Req() req): Promise<User[]> {
    const user = await req.user;
    return this.userService.search(user.id, query);
  }

  @Get('blocks/:id')
  @ApiOperation({ summary: 'Get blocked of user' })
  async getBlocksOfUser(@Param('id', ParseIntPipe) id: number): Promise<User[]> {
    return this.userService.getBlocksOfUser(Number(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }

  @Get(':id/status')
  async getUserStatus(@Param('id') id: string): Promise<Status> {
    return this.userService.getUserStatusById(Number(id));
  }

  @Put(':id/status')
  @ApiBody({ type: UpdateUserStatusDto })
  @ApiOperation({ summary: 'Update user status' })
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<Status> {
    return this.userService.updateUserStatusById(id, updateUserStatusDto.status);
  }

}
