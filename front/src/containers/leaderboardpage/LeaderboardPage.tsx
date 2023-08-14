import React, { useContext, useEffect, useState } from 'react';

import LeaderboardTabs from './LeaderboardTabs';
import { ApplicationContext } from "../Auth";
import {getUsers} from "../../api";
import LeaderboardContent from './LeaderboardContent';

import "../../css/leaderboard.css"
import { getUserRank, getUsersWithRanks } from './common';

const states = ["Total xp", "Victories/defeat ratio", "Average points per match"];

export default function LeaderboardPage(){

  const user = useContext(ApplicationContext);

  const [state, setState] = useState("Total xp");

  const handleClick = (text) => {
    setState(text);
  }

  const [placement, setPlacement] = useState(0);

  var [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(function (response) {
        setUsers(response.data);
      })
      .catch(function (error) {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const usersWithRank = getUsersWithRanks(users);

  useEffect(() => {
    if (user?.id === undefined )
      return ;
    setPlacement(getUserRank(user.id, usersWithRank) ?? 0)
  }, [usersWithRank])

  return (
    <div className='leaderboard-body'>
        <div className='leaderboard-main-frame'>
            <div className="leaderboard-places"> Leaderboard </div>

            <LeaderboardTabs
            key="tabs"
            states={states}
            handleClick={handleClick}
            state={state}
            placement={placement} />
            
            <div className='horizontal-separator'></div>
            
            <LeaderboardContent users={usersWithRank} state={state} />

        </div>
    </div>
  )
}