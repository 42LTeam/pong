import React, { useContext, useEffect, useState } from 'react';

import LeaderboardTabs from './LeaderboardTabs';
import { AuthContext } from "../Auth";
import {getUsers} from "../../api";
import LeaderboardContent from './LeaderboardContent';

import "../../css/leaderboard.css"


export default function LeaderboardPage(){

    const user = useContext(AuthContext);

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

                <LeaderboardTabs />
                
                <div className='horizontal-separator'></div>
                
                <LeaderboardContent users={users}/>

            </div>
        </div>
    )
}