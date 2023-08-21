import { User } from "../Auth";
import { getUserMatches } from "../../api";

export interface UserRank extends User {
    rank: number;
    //ratio: number;
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

        users.forEach((users) => {
            getUserMatches(users.id)
                .then(function (response) {
                    const matches = response.data;
                    console.log(users.id+" has matches = "+response.data);//LOG
                    if (matches.length > 0) {
                        const totalPoints = matches.reduce((sum: number, match: { score: number; }) => sum + match.score, 0);
                        const averagePoints = totalPoints / matches.length;
                        users.pointAverage = averagePoints;
                    } else {
                        users.pointAverage = 0;
                    }
                    console.log(users.id+" has average = "+users.pointAverage);//LOG
                })
                .catch(function (error) {
                    console.error('Error fetching user matches:', error);
                });
        });

        console.log("NOW "+users[2].id+" has score="+users[statName]);
        statName = 'pointAverage';
        
        // statName = 'role';

    }
4
    return users.sort((a, b) => b[statName] - a[statName]).map((user) => {

            console.log("my statname serched is ="+statName //LOG
            +" and "+user.id+" has score="+user[statName]);

            if (user[statName] !== currentStat) {
                currentStat = user[statName];
                currentRank++;
            }

            return { ...user, rank: currentRank};
        })
};

export const getUserRank = (id: User["id"], users: UserRank[] ): number | null => {
    return users.find(user => user.id === id)?.rank ?? null;
};