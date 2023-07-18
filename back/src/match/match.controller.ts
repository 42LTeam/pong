import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';
import { Match } from '@prisma/client';

class CreateMatchDto {
    @ApiProperty()
    usersIds: number[];
  
    @ApiProperty()
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