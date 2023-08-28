import { Controller, Get, Param, Post, Put, Body, ParseIntPipe } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { Match, UserMatch } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString, IsBoolean  } from '@nestjs/class-validator';

class CreateMatchDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    usersIds: number[];
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    scores: number[];

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    isWins: boolean[];
  }
  
@ApiTags('match')
@Controller('match')
export class MatchController {
constructor(private matchService: MatchService) {}

@Post('create')
@ApiOperation({ summary: 'Create a match' })
@ApiBody({ type: CreateMatchDto })
async createMatch(
    @Body() createMatchDto: CreateMatchDto,
):
    Promise<Match> {
    return this.matchService.createMatch(createMatchDto.usersIds, createMatchDto.scores, createMatchDto.isWins);
    }

@Get('common/:userId1/:userId2')
@ApiOperation({ summary: 'Get matches between two users' })
async getCommonUserMatches(
    @Param('userId1', ParseIntPipe) userId1: number,
    @Param('userId2', ParseIntPipe) userId2: number
): Promise<UserMatch[]> {
    return this.matchService.getCommonUserMatches(userId1, userId2);
}


@Get('stats/:userId1/:userId2')
@ApiOperation({ summary: 'Get user match stats against another user' })
async getUserMatchStats(
    @Param('userId1', ParseIntPipe) userId1: number,
    @Param('userId2', ParseIntPipe) userId2: number
): Promise<{ wins: number; losses: number }> {
    return this.matchService.getUserMatchStats(userId1, userId2);
}


}