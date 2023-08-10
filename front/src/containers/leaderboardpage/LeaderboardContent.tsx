import React from 'react';

import "../../css/profile.css";

import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';

export default function LeaderboardContent({ users }) {
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

  return (
     <div className='leaderboard-content'>
        {sortedUsers.map((user, index) => (
            <LeaderboardPlaceBubble key={user.id} user={user} kind={"Total xp"} rank={index + 1}/>
        ))}
     </div>
  );
};