import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
  ParseBoolPipe,
  Query,
} from "@nestjs/common";
import { ApiBody, ApiProperty, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "@nestjs/class-validator";
import { StringPipe } from "./pipes/string.pipe";
import { Roles } from "../auth/roles.decorator";
import { Channel, Status, User, UserMatch } from "@prisma/client";
import { MatchService } from "src/match/match.service";

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

export class SearchDTO {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  friendOnly?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  notFriend?: boolean;
}

@ApiTags("users")
@Controller("users")
@UseGuards(AuthenticatedGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private matchService: MatchService
  ) {}

  @Post()
  @Roles(Role.ADMIN) // For admin restrictions
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: "Create a user" })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(
      createUserDto.id,
      createUserDto.username,
      createUserDto.secretO2FA,
      createUserDto.avatar,
      createUserDto.xp
    );
  }

  @Get()
  @Roles(Role.USER)
  @ApiOperation({ summary: "Get all users" })
  @ApiBody({ type: SearchDTO })
  async getAllUsers(
    @Req() req,
    @Query("notFriend", ParseBoolPipe) notFriend: boolean
  ): Promise<User[]> {
    const user = await req.user;
    return this.userService.getAllUsers(user.id, { notFriend });
  }

  @Get("id/:id")
  @ApiOperation({ summary: "Get user by id" })
  async getUserById(
    @Param("id", ParseIntPipe) id: number
  ): Promise<User | null> {
    return this.userService.getUserById(Number(id));
  }

  @Put("avatar/:id")
  @ApiOperation({ summary: "Update user's avatar" })
  @ApiBody({ type: UpdateUserAvatarDto })
  async updateUserAvatar(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserAvatarDto: UpdateUserAvatarDto
  ): Promise<User> {
    return this.userService.updateUserAvatar(
      Number(id),
      updateUserAvatarDto.avatar
    );
  }

  @Put("username/:id")
  @ApiOperation({ summary: "Update user's username" })
  @ApiBody({ type: UpdateUserNameDto })
  async updateUserName(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserNameDto: UpdateUserNameDto
  ): Promise<User> {
    return this.userService.updateUserName(
      Number(id),
      updateUserNameDto.username
    );
  }

  @Get("friend/:id")
  @ApiOperation({ summary: "Get friend of user" })
  async getFriendsOfUser(
    @Param("id", ParseIntPipe) id: number
  ): Promise<User[]> {
    return this.userService.getFriendsOfUser(Number(id));
  }

  @Get("friend/online/:id")
  @ApiOperation({ summary: "Get friend of user" })
  async getOnlineFriendsOfUser(
    @Param("id", ParseIntPipe) id: number
  ): Promise<User[]> {
    return this.userService.getFriendsOfUser(Number(id), { online: true });
  }

  @Get("search/:query")
  @ApiOperation({ summary: "Search user by username" })
  @ApiBody({ type: SearchDTO })
  async search(
    @Param("query", StringPipe) query: string,
    @Body() body: SearchDTO,
    @Req() req
  ): Promise<User[]> {
    const user = await req.user;
    return this.userService.search(user.id, query, body);
  }

  @Get("search/friend/:query")
  @ApiOperation({ summary: "Search user by username" })
  async searchFriendOnly(
    @Param("query", StringPipe) query: string,
    @Req() req
  ): Promise<User[]> {
    const user = await req.user;
    return this.userService.getFriendsOfUser(user.id, { startWith: query });
  }

  @Get("friend-request/pending/:userId")
  @ApiOperation({ summary: "Get pending request" })
  async getPendingFriends(@Param("userId") userId: number): Promise<any[]> {
    return this.userService.getPendingFriendRequests(Number(userId));
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete user" })
  async deleteUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.userService.deleteUser(Number(id));
  }

  @Get(":id/status")
  async getUserStatus(@Param("id") id: string): Promise<Status> {
    return this.userService.getUserStatusById(Number(id));
  }

  @Put(":id/status")
  @ApiBody({ type: UpdateUserStatusDto })
  @ApiOperation({ summary: "Update user status" })
  async updateUserStatus(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateUserStatusDto: UpdateUserStatusDto
  ): Promise<Status> {
    return this.userService.updateUserStatusById(
      id,
      updateUserStatusDto.status
    );
  }

  @Get(":id/matches")
  @ApiOperation({ summary: "Get all matches of user by Id" })
  async getUserMatches(
    @Param("id", ParseIntPipe) id: number
  ): Promise<UserMatch[]> {
    return this.matchService.getUserMatches(id);
  }
}
