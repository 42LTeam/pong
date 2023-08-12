import React from 'react';
import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';

export default function LeaderboardContent({ users }) {
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

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
      {usersWithRanks.map((user) => (
        <LeaderboardPlaceBubble key={user.id} user={user} kind={"Total xp"} rank={user.rank} />
      ))}
    </div>
  );
}