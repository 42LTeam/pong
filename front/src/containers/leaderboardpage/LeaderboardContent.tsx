import React from 'react';
import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';
import { User } from '../Auth';

type Props = {
  users : User[];
  state : string;
}

export default function LeaderboardContent(props : Props) {
  const sortedUsers = [...props.users].sort((a, b) => b.xp - a.xp);

  let currentRank = 0;
  let currentXP = null;

  const usersWithRanks = sortedUsers.map((user) => {
    if (user.xp !== currentXP) {
      currentXP = user.xp;
      currentRank++;
    }
    return { ...user, rank: currentRank };
  });

  return (
    <div className='leaderboard-content'>
      im on state : {props.state}
      {usersWithRanks.map((user) => (
        <LeaderboardPlaceBubble key={user.id} user={user} kind={"Total xp"} rank={user.rank} />
      ))}
    </div>
  );
}