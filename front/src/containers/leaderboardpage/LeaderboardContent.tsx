import React, { useContext, useEffect, useState } from 'react';
import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';
import { UserRank } from './GetRanks';

type Props = {
  users : UserRank[];
  state : string;
}

export default function LeaderboardContent(props : Props) {

  return (
    <div className='leaderboard-content'>
      {props.users.map((user) => (  
        <LeaderboardPlaceBubble key={user.id} user={user} kind={props.state} rank={user.rank} />
      ))}
    </div>
  );
}