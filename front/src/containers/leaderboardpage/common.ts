import { User } from "../Auth";

export interface UserWithRank extends User {
    rank: number;
}

export const getUsersWithRanks = (users : User[]): UserWithRank[] => {
    let currentRank = 0;
    let currentXP = 0;

    return users.sort((a, b) => b.xp - a.xp).map((user) => {
            if (user.xp !== currentXP) {
                currentXP = user.xp;
                currentRank++;
            }
            return { ...user, rank: currentRank };
        })
}

export const getUserRank = (id: User["id"], users: UserWithRank[] ): number | null => {
    return users.find(user => user.id === id)?.rank ?? null;
}