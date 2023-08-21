import { User } from "../Auth";
import { getUserMatches } from "../../api";

export interface UserRank extends User {
    rank: number;
}

// export const getUsersRanks = (users : User[], StatKind: string): UserRank[] => {
//     let currentRank = 0;
//     let currentStat = 0;

//     let statName = ""; //name of the column in DB
//     if (StatKind === "Total xp") {
//         users.forEach((users) => {
//             if (users.xp > 0) {
//                 users.playedMatch = true;
//             } else {
//                 users.playedMatch = false;
//             }
//         })
//         statName = 'xp';
//     }
//     else if (StatKind === "Victories/defeat ratio"){
//         users.forEach((users) => {
//             getUserMatches(users.id)
//                 .then(function (response) {
//                     const matches = response.data;
//                     if (matches.length > 0) {
//                         const winNumber = matches.reduce((sum: number, match: { isWin: boolean; }) => sum + (match.isWin ? 1 : 0), 0);
//                         const ratio = winNumber / matches.length;
//                         users.ratio = ratio;
//                         users.playedMatch = true;
//                     } else {
//                         users.ratio = -1;
//                         users.playedMatch = false;
//                     }
//                 })
//                 .catch(function (error) {
//                     console.error('Error fetching user matches:', error);
//                 });
//         });

//         statName = 'ratio';
//     }
//     else if (StatKind === "Average points per match"){

//         users.forEach((users) => {
//             getUserMatches(users.id)
//                 .then(function (response) {
//                     const matches = response.data;
//                     if (matches.length > 0) {
//                         const totalPoints = matches.reduce((sum: number, match: { score: number; }) => sum + match.score, 0);
//                         const averagePoints = totalPoints / matches.length;
//                         users.pointAverage = averagePoints;
//                         users.playedMatch = true;
//                     } else {
//                         users.pointAverage = -1;
//                         users.playedMatch = false;
//                     }
//                 })
//                 .catch(function (error) {
//                     console.error('Error fetching user matches:', error);
//                 });
//         });
//         statName = 'pointAverage';

//     }
// 4
//     return users.sort((a, b) => b[statName] - a[statName]).map((user) => {
//         if (user[statName] !== currentStat) {
//             currentStat = user[statName];
//             currentRank++;
//         }
//         return { ...user, rank: currentRank};
//     })
// };

// export const getUserRank = (id: User["id"], users: UserRank[] ): number | null => {
//     return users.find(user => user.id === id)?.rank ?? null;
// };

export const getUsersRanks = async (users: User[], StatKind: string): Promise<UserRank[]> => {
    let currentRank = 0;
    let currentStat = 0;

    let statName = ""; //name of the column in DB

    const updUsers = await Promise.all(users.map((user) => getUserMatches(user.id)))

    const newUsers = updUsers.map((response,idx) => {
        const matches = response.data;
        let user = {...users[idx]}
        if (matches.length > 0) {

            const winNumber = matches.reduce((sum: number, match: { isWin: boolean; }) => sum + (match.isWin ? 1 : 0), 0);
            const ratio = winNumber / matches.length;
            user = {...user, ratio};

            const totalPoints = matches.reduce((sum: number, match: { score: number; }) => sum + match.score, 0);
            const averagePoints = totalPoints / matches.length;
            user = { ...user,  pointAverage : averagePoints };
            user = {...user, playedMatch : true};
        } else {
            user = {...user, ratio: -1, pointAverage: -1, playedMatch: false};
        }
        user = {...user, leaderboard: true};
        return user;
    })

    if (StatKind === "Total xp") {
        statName = 'xp';
    }
    else if (StatKind === "Average points per match") {
        statName = 'pointAverage';
    }
    else if (StatKind === "Victories/defeat ratio") {
        statName = 'ratio';
    }
    
    return newUsers.sort((a, b) => b[statName] - a[statName]).map((user) => {
        if (user[statName] !== currentStat) {
            currentStat = user[statName];
            currentRank++;
        }
        return { ...user, rank: currentRank };
    })
};

export const getUserRank = (id: User["id"], users: UserRank[]): number | null => {
    return users.find(user => user.id === id)?.rank ?? null;
};