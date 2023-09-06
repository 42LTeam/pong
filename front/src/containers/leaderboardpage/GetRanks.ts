import { User } from "../Auth";
import { getUserByID, getUserMatches } from "../../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export interface UserRank extends User {
  rank: number;
}

export const getUsersRanks = async (
  users: User[],
  StatKind: string
): Promise<UserRank[]> => {
  let currentRank = 0;
  let currentStat = 0;

  let statName = ""; //nom precis de l'attribut

  const updUsers = await Promise.all(
    users.map((user) => getUserMatches(user.id))
  );

  const newUsers = updUsers.map((response, idx) => {
    const matches = response.data;
    let user = { ...users[idx] };
    if (matches.length > 0) {
      const winNumber = matches.reduce(
        (sum: number, match: { isWin: boolean }) => sum + (match.isWin ? 1 : 0),
        0
      );
      const ratio = winNumber / matches.length;
      user = { ...user, ratio };

      const totalPoints = matches.reduce(
        (sum: number, match: { score: number }) => sum + match.score,
        0
      );
      const averagePoints = totalPoints / matches.length;
      user = { ...user, pointAverage: averagePoints };
      user = { ...user, playedMatch: true };
    } else {
      user = { ...user, ratio: -1, pointAverage: -1, playedMatch: false };
    }
    user = { ...user, leaderboard: true };
    return user;
  });

  if (StatKind === "Total xp") {
    statName = "xp";
  } else if (StatKind === "Average points per match") {
    statName = "pointAverage";
  } else if (StatKind === "Victories/defeat ratio") {
    statName = "ratio";
  }

  return newUsers
    .sort((a, b) => b[statName] - a[statName])
    .map((user) => {
      if (user[statName] !== currentStat) {
        currentStat = user[statName];
        currentRank++;
      }
      return { ...user, rank: currentRank };
    });
};

export const getUserRank = (
  targetUser: User,
  users: UserRank[]
): number | null => {
  if (targetUser.playedMatch === false) {
    console.log("no match for " + targetUser.username);
    return null;
  }

  const foundUser = users.find((user) => user.id === targetUser.id);
  return foundUser ? foundUser.rank : null;
};

export const getRatio = async (userID: number) => {
  try {
    const response = await getUserMatches(userID);
    const matches = response.data;

    if (matches.length > 0 || !matches) {
      const winNumber = matches.reduce(
        (sum: number, match: { isWin: boolean }) => sum + (match.isWin ? 1 : 0),
        0
      );
      return winNumber / matches.length;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching user matches:", error);
    return 0;
  }
};

export const getAveragePoint = async (userID: number) => {
  try {
    const response = await getUserMatches(userID);
    const matches = response.data;
    if (matches.length > 0) {
      const totalPoints = matches.reduce(
        (sum: number, match: { score: number }) => sum + match.score,
        0
      );
      const pointAverage = totalPoints / matches.length;
      return pointAverage;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("Error fetching user matches:", error);
    return 0;
  }
};
