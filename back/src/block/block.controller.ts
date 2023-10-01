import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  ApiBody,
  ApiProperty,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { BlockService } from "./block.service";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { FriendService } from "../friend/friend.service";
import { IsNotEmpty, IsNumber } from "@nestjs/class-validator";
import { Block, User } from "@prisma/client";
import { UserSerializer } from "../user/user.serializer";

class CreateBlockDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  blockedId: number;
}

@ApiTags("block")
@Controller("block")
@UseGuards(AuthenticatedGuard)
export class BlockController {
  constructor(
    private blockService: BlockService,
    private friendService: FriendService
  ) {}

  @Post("/create")
  @ApiOperation({ summary: "Create a block request" })
  @ApiResponse({
    status: 201,
    description: "The block request has been successfully created.",
  })
  @ApiBody({ type: CreateBlockDto })
  async createBlockRequest(
    @Body() createBlockDto: CreateBlockDto,
    @Req() req
  ): Promise<Block> {
    const user = await req.user;
    const ret = await this.blockService.createBlockRequest(
      user.id,
      createBlockDto.blockedId
    );
    await this.friendService.removeFriendship(
      user.id,
      createBlockDto.blockedId
    );
    return ret;
  }

  @Get("/blocked")
  @ApiOperation({ summary: "Get blocked users" })
  @ApiResponse({ status: 200, description: "List of blocked users." })
  async getBlockedUsers(
      @Req() req
  ): Promise<User[]> {
    const user = await req.user
    return this.blockService.getBlockedUsers(user.id);
  }

  @Delete("/remove")
  @HttpCode(204)
  @ApiOperation({ summary: "Remove a block request" })
  @ApiResponse({
    status: 204,
    description: "The block request has been successfully removed.",
  })
  @ApiBody({ type: CreateBlockDto })
  async removeBlockRequest(
    @Body() removeBlockDto: CreateBlockDto,
    @Req() req
  ): Promise<Block> {
    const user = await req.user;
    return this.blockService.removeBlockRequest(
      user.id,
      removeBlockDto.blockedId
    );
  }

  @Get("blocks")
  @ApiOperation({ summary: "Get blocked of user" })
  async getBlocksOfUser(
      @Req() req

  ): Promise<User[]> {
    const user = await req.user
    return this.blockService.getBlocksOfUser(user.id);
  }
}
