import React, { useContext, useEffect } from 'react';
import LeaderboardPlaceBubble from './LeaderboardPlaceBubble';
import { User, ApplicationContext } from '../Auth';
import { UserWithRank, getUserRank, getUsersWithRanks } from './common';

type Props = {
  users : UserWithRank[];
  state : string;
}

export default function LeaderboardContent(props : Props) {

  return (
    <div className='leaderboard-content'>
      im on state : {props.state}
      {props.users.map((user) => (
        <LeaderboardPlaceBubble key={user.id} user={user} kind={"Total xp"} rank={user.rank} />
      ))}
    </div>
  );
}