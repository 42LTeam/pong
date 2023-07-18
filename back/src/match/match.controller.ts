import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { Match } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

class CreateMatchDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    usersIds: number[];
  
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    scores: number[];
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
    return this.matchService.createMatch(createMatchDto.usersIds, createMatchDto.scores);
    }


}