import { User } from "../Auth";

export interface UserRank extends User {
    rank: number;
}

export const getUsersRanks = (users : User[], StatKind: string): UserRank[] => {
    let currentRank = 0;
    let currentStat = 0;
    
    let statName = ""; //name of the column in DB
    if (StatKind === "Total xp") {
        statName = 'xp';
    }
    else if (StatKind === "Victories/defeat ratio"){
        statName = 'id';    //to change
    }
    else if (StatKind === "Average points per match"){
        statName = 'role';  //to change
    }

    return users.sort((a, b) => b[statName] - a[statName]).map((user) => {
            if (user[statName] !== currentStat) {
                currentStat = user[statName];
                currentRank++;
            }
            return { ...user, rank: currentRank };
        })
}

export const getUserRank = (id: User["id"], users: UserRank[] ): number | null => {
    return users.find(user => user.id === id)?.rank ?? null;
}