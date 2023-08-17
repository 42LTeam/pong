import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Match, UserMatch } from '@prisma/client';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async createMatch(userIds: number[], scores: number[]): Promise<Match> {
    if (!userIds || !scores || userIds.length !== scores.length) {
      throw new Error('Invalid input');
    }

    return this.prisma.$transaction(async (prisma) => {
      const createdMatch = await prisma.match.create({});

      const userMatches = userIds.map((userId, index) => prisma.userMatch.create({
        data: {
          userId: userId,
          matchId: createdMatch.id,
          score: scores[index]
        }
      }));

      await Promise.all(userMatches);

      return createdMatch;
    });
  }

  async getUserMatches(userId: number): Promise<UserMatch[]> {
    return this.prisma.userMatch.findMany({
      where: {
        userId: userId,
      },
    });
  }
    
}