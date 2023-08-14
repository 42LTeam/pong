import React, { useContext, useEffect, useState } from 'react';

import LeaderboardTabs from './LeaderboardTabs';
import { ApplicationContext } from "../Auth";
import {getUsers} from "../../api";
import LeaderboardContent from './LeaderboardContent';

import "../../css/leaderboard.css"

const states = ["Total xp", "Victories/defeat ratio", "Average points per match"];

export default function LeaderboardPage(){

  const user = useContext(ApplicationContext);

  const [state, setState] = useState("Total xp");

  const handleClick = (text) => {
    setState(text);
  }

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


  return (
    <div className='leaderboard-body'>
        <div className='leaderboard-main-frame'>
            <div className="leaderboard-places"> Leaderboard </div>

            <LeaderboardTabs
            key="tabs"
            states={states}
            handleClick={handleClick}
            state={state}
            placement={1} />
            
            <div className='horizontal-separator'></div>
            
            <LeaderboardContent users={users} state={state}/>

        </div>
    </div>
  )
}