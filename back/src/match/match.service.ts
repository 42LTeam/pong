import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User, Match, UserMatch } from "@prisma/client";

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async createMatch(
    userIds: number[],
    scores: number[],
    isWins: boolean[]
  ): Promise<Match> {
    if (!userIds || !scores || userIds.length !== scores.length) {
      throw new Error("Invalid input");
    }

    return this.prisma.$transaction(async (prisma) => {
      const createdMatch = await prisma.match.create({});

      const userMatches = userIds.map((userId, index) =>
        prisma.userMatch.create({
          data: {
            userId: userId,
            matchId: createdMatch.id,
            score: scores[index],
            isWin: isWins[index],
          },
        })
      );

      await Promise.all(userMatches);

      return createdMatch;
    });
  }

  async getUserMatches(userId: number): Promise<UserMatch[]> {
    return this.prisma.userMatch.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        matchId: 'desc',
      },
    });
  }

  async getCommonUserMatches(
    userId1: number,
    userId2: number
  ): Promise<UserMatch[]> {
    const userMatches1 = await this.prisma.userMatch.findMany({
      where: {
        userId: userId1,
      },
    });

    const userMatches2 = await this.prisma.userMatch.findMany({
      where: {
        userId: userId2,
      },
    });

    const commonUserMatches = userMatches1.filter((um1) =>
      userMatches2.some((um2) => um2.matchId === um1.matchId)
    );

    return commonUserMatches;
  }

  async getUserMatchStats(
    userId1: number,
    userId2: number
  ): Promise<{ wins: number; losses: number }> {
    const userMatches1 = await this.prisma.userMatch.findMany({
      where: {
        userId: userId1,
      },
    });

    const userMatches2 = await this.prisma.userMatch.findMany({
      where: {
        userId: userId2,
      },
    });

    let wins = 0;
    let losses = 0;

    for (const userMatch1 of userMatches1) {
      const matchingUserMatch2 = userMatches2.find(
        (um) => um.matchId === userMatch1.matchId
      );

      if (!matchingUserMatch2) {
        continue;
      }

      if (userMatch1.score > matchingUserMatch2.score) {
        wins++;
      } else if (userMatch1.score < matchingUserMatch2.score) {
        losses++;
      }
    }

    return { wins, losses };
  }
}
